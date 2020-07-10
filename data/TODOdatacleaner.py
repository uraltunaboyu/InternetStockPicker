import pandas as pd
import json
import string

with open('./URS/scrapes/07-09-2020/c-Daily Discussion Thread for July 09, 2020-RAW.json', 'r') as f:
    data = json.load(f)

with open ('./URS/scrapes/07-09-2020/c-What Are Your Moves Tomorrow, July 09, 2020-RAW.json', 'r') as f2:
    data2 = json.load(f2)

with open('./s&p500editable.json', 'r') as s:
    snp = json.load(s)

commonWords = ["i", "the", "and", "or", "yes", "no", "for", "if", "let's", "see", "of", "in", "more", "if", "not", "your", "daily", "all", "year", "buy", "sell", "call", "put", "a", "are", "all"]
entryID = []
for index in data:
    entryID.append(index)


#Cleaning the data for f1
for entry in entryID: 
    for index in data[entry]:
        index["Text"] = index["Text"].lower()
        words = index["Text"].split()
        for word in words:
            if len(word) > 5:
                words.remove(word)
            if word in commonWords:
                words.remove(word)
        index["Text-Array"] = words
        #print(words)


for company in snp:
    company["Mentions"] = 0

for entry in entryID:
    for index in data[entry]:
        for company in snp:
            lowercaseSymbol = company["Symbol"].lower()
            if lowercaseSymbol in index["Text-Array"]:
                company["Mentions"] += 1

entryID = []
for index in data2:
    entryID.append(index)

#Cleaning the data for f2

for entry in entryID: 
    for index in data2[entry]:
        index["Text"] = index["Text"].lower()
        words = index["Text"].split()
        for word in words:
            if len(word) > 5:
                words.remove(word)
            if word in commonWords:
                words.remove(word)
        index["Text-Array"] = words

for entry in entryID:
    for index in data2[entry]:
        for company in snp:
            lowercaseSymbol = company["Symbol"].lower()
            if lowercaseSymbol in index["Text-Array"]:
                company["Mentions"] += 1


with open('snpMentioned.json', 'w') as outfile:
    json.dump(snp, outfile)