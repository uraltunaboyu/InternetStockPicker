import pandas as pd
import json
import string
import praw
from praw.models import MoreComments
from alpha_vantage.timeseries import TimeSeries
import time
from decimal import *


reddit = praw.Reddit(client_id="TA_VSbjQ6EIiBQ",
                     client_secret="LGXVe-Kc623A4nvDhV3_MsmW04k",
                     user_agent="Reddit Scraper",
                     username="justherefortheapi", 
                     password="rhic_yaik6NON!scey" 
)

# Creation of reddit instance
# Actual login info should NOT be on Github

wsb = reddit.subreddit("wallstreetbets")
inv = reddit.subreddit("investing")
secan = reddit.subreddit("SecurityAnalysis")
stocks = reddit.subreddit("stocks")
opt = reddit.subreddit("options")
rbh = reddit.subreddit("robinhood")
cdi = reddit.subreddit("CanadianInvestor")
bsb = reddit.subreddit("Baystreetbets")

subreddits = [wsb, inv, secan, stocks, opt, rbh, cdi, bsb]

# List of subreddits to check comments from.


massComments = []

# This list will hold on comments.

print('\n###    Gathering comments  ###\n')

for subreddit in subreddits:
    for submission in subreddit.hot(limit=50):
        submission.comments.replace_more(limit=None)
        for comment in submission.comments.list():
            massComments.append(comment.body)

 # Above code gets all comments from the top 50 submissions of the day from the subreddits.
 # This a compromise. Ideally it would cover daily top 100.


with open("comments.txt", "w") as text_file:
    for comment in massComments:
        text_file.write(comment)

print('\n###    Comments downloaded successfully    ###\n')



with open ('./comments.txt', 'r') as f3:
    extraCom = f3.readlines()

with open('./companyMentioned.json', 'r') as s:
    comps = json.load(s)

filename = "google-10000-english-usa.txt"
  
commonWords = []
capitalCommonWords = []
acronymReddit = ["DD", "USA", "FD", "CEO"]
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
        company["ChangeInRank"] = company["LastRank"] - company["CurrentRank"]
        if company["ChangeInRank"] > 0:
            company["ChangeInRank"] = "+" + str(company["ChangeInRank"])
    else:
        company["ChangeInRank"] = "+" + str(company["CurrentRank"])
    i += 1

# CurrentRank is calculated after being transfered to LastRank

with open('companyMentioned.json', 'w') as outfile:
    json.dump(comps, outfile)  


print('\n###Mentions and ranks updated successfully###\n')




with open('./companyMentioned.json', 'r') as s:
    comps = json.load(s)

def extractMentions(json):
    try:
        return int(json['Mentions'])
    except KeyError:
        return 0

# This function returns the value of Mentions.

comps.sort(key=extractMentions, reverse=True)


ts = TimeSeries(key='0RWDK629LMHCGPMI', output_format='pandas')

print('\n###    Gathering stock data    ###\n')

i = 0
for company in comps:
    if i < 50:
        data, meta_data = ts.get_daily(symbol=company["ACT Symbol"], outputsize='full')
        company["Open"] = data.iloc[0]['1. open']
        company["Close"] = data.iloc[0]['4. close']
        daily_change_dollar = Decimal( company["Close"] - company["Open"]).quantize(Decimal('.01'), rounding=ROUND_DOWN)
        daily_change_percent = Decimal((100 * (company["Close"] - company["Open"]) / company["Open"])).quantize(Decimal('.01'), rounding=ROUND_DOWN)
        company["Daily Change $"] = str(daily_change_dollar)
        company["Daily Change %"] = str(daily_change_percent)
        i += 1
        time.sleep(12)

closedComps = []

i = 0
for company in comps:
    if i < 50:
        closedComps.append(company)
        i += 1


with open('companyMentioned_Stock.json', 'w') as outfile:
    json.dump(closedComps, outfile)  


print('###  Script executed successfully!   ###\n')