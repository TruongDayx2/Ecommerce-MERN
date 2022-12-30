import random
import time
import json
import torch
from model.intents_model import NeuralNet
from nltk_utils import bag_of_words, tokenize
import fastapi
import uvicorn
from model_api.message import Message
from fastapi.middleware.cors import CORSMiddleware

#device = torch.device('cpu')
device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
with open('intents.json', 'r', encoding='utf8') as f:
    intents = json.load(f)

FILE = 'data.pth'
data = torch.load(FILE)


import requests
api_url = "http://localhost:5000/api/products"
price = "Đây là sản link sản phẩm ạ và giá sản phẩm là ";
domain="@@@@http://localhost:3000/product/"
response = requests.get(api_url)
response.json()
name_product = []
for i in range(len(response.json())):
    name_product.append((response.json()[i].get('title').split(' ')[-1]))

input_size = data['input_size']
hidden_size = data['hidden_size']
output_size = data['output_size']
all_words = data['all_words']
tags = data['tags']
model_state = data['model_state']

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

app = fastapi.FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chatbot")
async def get_response(messenge: Message):
    
    if messenge is None or messenge.msg == "quit":
        return {"response": "Bye", "status": "success"}
    try:
        sentence = messenge.msg

        sentence = tokenize(sentence)
        x = bag_of_words(sentence, all_words)
        x = x.reshape(1, x.shape[0])
        x = torch.from_numpy(x).to(device)

        output = model(x)
        _, predicted = torch.max(output, dim=1)
        tag = tags[predicted.item()]

        probs = torch.softmax(output, dim=1)
        prob = probs[0][predicted.item()]
        flg = 0    
        result = ""
        if prob.item() > 0.75:
            if tag == 'name-product':
                for i in range(len(name_product)):
                    for j in range(len(sentence)):
                        if name_product[i].lower() == sentence[j].lower():
                            print(name_product[i])
                            if response.json()[i].get('title').split(' ')[-1] == name_product[i]:
                                result=str(price)+str(response.json()[i].get('price'))+".000 VND"+str(domain)+str(response.json()[i].get('_id'))+"@@@@"+str(response.json()[i].get('img')  )           
                                print(result)
                                flg = 1
                                break
                if flg == 0:
                    result = "Xin lỗi, chúng tôi không có sản phẩm này"
            else:
                for intent in intents['intents']:
                    if tag == intent["tag"]:
                        result = random.choice(intent['responses'])
                        print(result)
        else:
            result = "Xin lỗi, chúng tôi không hiểu ý bạn"
            print(result)
    except:
        return {"response": "Ối! Đã xảy ra sự cố!", "status": "failed"}
    
    return {"response": result, "status": "success"}

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8080)