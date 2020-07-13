import pandas as pd
import json
import string

with open('./c-Daily Discussion Thread for July 09, 2020-RAW.json', 'r') as f:
    data = json.load(f)

with open ('./c-What Are Your Moves Tomorrow, July 09, 2020-RAW.json', 'r') as f2:
    data2 = json.load(f2)

with open('./companyGeneral.json', 'r') as s:
    snp = json.load(s)

filename = "google-10000-english-usa.txt"
  
commonWords = []
capitalCommonWords = []
commonWordsFile = open(filename)

for line in commonWordsFile:
    commonWords.append(line.strip())

for word in commonWords:
    capitalCommonWords.append(word.capitalize())



entryID = []
for index in data:
    entryID.append(index)


#Cleaning the data for f1
for entry in entryID: 
    for index in data[entry]:
        words = index["Text"].split()
        for word in words:
            if len(word) > 5:
                words.remove(word)
            elif word in commonWords or word in capitalCommonWords:
                words.remove(word)
            ###
            word = word.lower()
        index["Text-Array"] = words
        #print(words)


for company in snp:
    company["Mentions"] = 0

for entry in entryID:
    for index in data[entry]:
        for company in snp:
            lowercaseSymbol = company["ACT Symbol"].lower()
            if lowercaseSymbol in index["Text-Array"]:
                company["Mentions"] += 1
            ticker = "$" + lowercaseSymbol
            if ticker in index["Text-Array"]:
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
            elif word in commonWords or word in capitalCommonWords:
                words.remove(word)
        index["Text-Array"] = words

for entry in entryID:
    for index in data2[entry]:
        for company in snp:
            lowercaseSymbol = company["ACT Symbol"].lower()
            if lowercaseSymbol in index["Text-Array"]:
                company["Mentions"] += 1


with open('companyMentioned.json', 'w') as outfile:
    json.dump(snp, outfile)