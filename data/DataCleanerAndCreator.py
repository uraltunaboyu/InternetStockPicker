import pandas as pd
import json
import string



# This program imports the comment datasets, the companies, and the common words.
# It transfers the words in each line of the google-10000-english-usa.txt into commonWords.
# This is replicated for capitalCommonWords to check for capitalized 'And' etc.
# Then it tokenizes each word in each comment from the sources.
# Then it checks if these tokens are longer than 5 characters (max length of stock tickers), if so, removes them.
# Then it checks if the token word is in the commonWords list of the capitalCommonWords list, if so, removes them.
# Then it cross-references the word with the ACT Symbols of each company in the company json.


with open('./c-Daily Discussion Thread for July 09, 2020-RAW.json', 'r') as f:
    data = json.load(f)

with open ('./c-What Are Your Moves Tomorrow, July 09, 2020-RAW.json', 'r') as f2:
    data2 = json.load(f2)

with open ('./comments.txt', 'r') as f3:
    extraCom = f3.read()

with open('./cleanedCompany.json', 'r') as s:
    comps = json.load(s)

filename = "google-10000-english-usa.txt"
  
commonWords = []
capitalCommonWords = []
commonWordsFile = open(filename)

for line in commonWordsFile:
    commonWords.append(line.strip())

for word in commonWords:
    capitalCommonWords.append(word.capitalize())

#### Above code transfers the common words into the program. Creates two dictionaries for the words, lowercase and capitalized

entryID = []
for index in data:
    entryID.append(index)
# Preping for JSON parse


cleanEntry = []

#Cleaning the data for comment source 1
for entry in entryID: 
    for index in data[entry]:
        words = index["Text"].split()
        for i, word in enumerate(words):
            word = word.strip()
            table = str.maketrans(dict.fromkeys(string.punctuation))  
            word = word.translate(table)
            if len(word) <= 5:
                if word not in commonWords:
                    if word not in capitalCommonWords:
                        cleanEntry.append(word.strip())


entryID = []
for index in data2:
    entryID.append(index)
# Data from comment source 2

for entry in entryID: 
    for index in data2[entry]:
        words = index["Text"].split()
        for i, word in enumerate(words):
            word = word.strip()
            table = str.maketrans(dict.fromkeys(string.punctuation))  
            word = word.translate(table)
            if len(word) <= 5:
                if word not in commonWords:
                    if word not in capitalCommonWords:
                        cleanEntry.append(word.strip())

for line in extraCom:
    words = line.split()
    for i, word in enumerate(words):
            word = word.strip()
            table = str.maketrans(dict.fromkeys(string.punctuation))  
            word = word.translate(table)
            if len(word) <= 5:
                if word not in commonWords:
                    if word not in capitalCommonWords:
                        cleanEntry.append(word.strip())



for company in comps: 
    company["Mentions"] = 0 # Creates the json attribute for each company and resets them.

for company in comps:
    for word in cleanEntry:
        if word == company["ACT Symbol"]:
            company["Mentions"] += 1
        dollarSymbol = "$" + company["ACT Symbol"]
        if word == dollarSymbol:
            company["Mentions"] += 1



with open('companyMentioned.json', 'w') as outfile:
    json.dump(comps, outfile) 