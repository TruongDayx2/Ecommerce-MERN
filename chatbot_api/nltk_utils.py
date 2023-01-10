import nltk
import numpy as np
from underthesea import word_tokenize

stremer = nltk.stem.PorterStemmer()

def tokenize(sentence):
    return word_tokenize(sentence)

def stem(word):
    return stremer.stem(word.lower())

def bag_of_words(tokenized_sentence, all_words):
    tokenized_sentence = [stem(w) for w in tokenized_sentence]
    bag = np.zeros(len(all_words), dtype=np.float32)
    for idx, w in enumerate(all_words):
        if w in tokenized_sentence:
            bag[idx] = 1.0

    return bag

text = "Hôm nay tôi đi thi tốt nghiệp"
tokenized_text = tokenize(text)
stem_words = [stem(w) for w in tokenized_text]
print(stem_words)