import pandas as pd
import json
import string

with open('./URS/scrapes/07-09-2020/c-Daily Discussion Thread for July 09, 2020-RAW.json', 'r') as f:
    data = json.load(f)

commonWords = ["i", "the", "and", "or", "yes", "no", "for", "if", "let's", "see", "of", "in", "more", "if", "not", "your", "daily", "all", "year", "buy", "sell", "call", "put"]
entryID = []
for index in data:
    entryID.append(index)

for entry in entryID:
    for index in data[entry]:
        index["Text"] = index["Text"].lower()
        words = index["Text"].split()
        for word in words:
            if len(word) > 5:
                words.remove(word)
            if word in commonWords:
                words.remove(word)
        print(words)