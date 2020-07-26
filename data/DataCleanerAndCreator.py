import pandas as pd
import json
import string



# This script imports the comments.txt from dataExtractor.py,
# the cleanCompany.json from CompanyFixer.py,
# and google-10000-english-usa.txt to check for common words.


with open ('./comments.txt', 'r') as f3:
    extraCom = f3.readlines()

with open('./companyMentioned.json', 'r') as s:
    comps = json.load(s)

filename = "google-10000-english-usa.txt"
  
commonWords = []
capitalCommonWords = []
acronymReddit = ["DD", "USA", "FD"]
commonWordsFile = open(filename)

for line in commonWordsFile:
    commonWords.append(line.strip())

for word in commonWords:
    capitalCommonWords.append(word.capitalize())

# Above code transfers the common words into the program. Creates two dictionaries for the words, lowercase and capitalized


cleanEntry = []


for line in extraCom:
    words = line.split()
    for i, word in enumerate(words):
            word = word.strip()
            table = str.maketrans(dict.fromkeys(string.punctuation))  
            word = word.translate(table)
            if len(word) <= 5:
                if word not in commonWords:
                    if word not in capitalCommonWords:
                        if word not in acronymReddit:
                            cleanEntry.append(word.strip())

# Above code determines which words MAY be tickers. It removes punctuation and checks for length. 
# Furthermore, if they are NOT in common or capitalCommonWords, the words are added the cleanEntry, final step before Ticker check.


for company in comps:
    company["Mentions"] = 0

# Resetting mentions without resetting ranks so they don't accumulate.


for company in comps:
    for word in cleanEntry:
        if word == company["ACT Symbol"]:
            company["Mentions"] += 1
        dollarSymbol = "$" + company["ACT Symbol"]
        if word == dollarSymbol:
            company["Mentions"] += 1

# Above snippet adds Mentions if words, or words when a $ is added to them, match Ticker symbols.

def extractMentions(json):
    try:
        return int(json['Mentions'])
    except KeyError:
        return 0

# This function returns the value of Mentions.

comps.sort(key=extractMentions, reverse=True)

# This line sorts the comps (to-be-written as companyMentioned.json) by Mentions

i = 1

for company in comps:
    company["LastRank"] = company["CurrentRank"]
    company["CurrentRank"] = i
    if company["LastRank"] != "NONE":
        company["ChangeInRank"] = company["CurrentRank"] - company["LastRank"]
        if company["ChangeInRank"] > 0:
            company["ChangeinRank"] = "+" + str(company["ChangeInRank"])
    else:
        company["ChangeInRank"] = "+" + str(company["CurrentRank"])
    i += 1

# CurrentRank is calculated after being transfered to LastRank

with open('companyMentioned.json', 'w') as outfile:
    json.dump(comps, outfile)  