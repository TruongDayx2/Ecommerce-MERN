import torch
import numpy as np

class TextGenerate:
    def __init__(self, dataset, model, next_words=100):
        self.model = model
        self.dataset = dataset
        self.next_words=next_words
    
    def predict(self, text):
        self.model.eval()

        words = text.split(' ')
        state_h, state_c = self.model.init_state(len(words))

        for i in range(0, self.next_words):
            x = torch.tensor([[self.dataset.word_to_index[w] for w in words[i:]]])
            y_pred, (state_h, state_c) = self.model(x, (state_h, state_c))

            last_word_logits = y_pred[0][-1]
            p = torch.nn.functional.softmax(last_word_logits, dim=0).detach().numpy()
            word_index = np.random.choice(len(last_word_logits), p=p)
            words.append(self.dataset.index_to_word[word_index])

        return words