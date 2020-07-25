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


with open ('./comments.txt', 'r') as f3:
    extraCom = f3.readlines()

with open('./cleanedCompany.json', 'r') as s:
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

#### Above code transfers the common words into the program. Creates two dictionaries for the words, lowercase and capitalized


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