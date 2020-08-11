import os
import requests
import concurrent.futures
import json
import string
import datetime
import praw
from praw.models import MoreComments
from prawcore.exceptions import RequestException
from alpha_vantage.timeseries import TimeSeries
import time
from decimal import Decimal, ROUND_DOWN

date = datetime.datetime.now()
datestring = f"{date:%d}{date:%b}{date:%Y}"
comments_file_name = f"comments_{datestring}.txt"

reddit = praw.Reddit("user")

# Creation of reddit instance
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

def analyse_subreddit(subreddit):
    limit = 50
    analyzed = 1
    subreddit_name = subreddit.display_name
    submissions = subreddit.top(time_filter='day', limit=limit)
    for submission in submissions:
        submission.comments.replace_more(limit=None)
        i = 0
        try:
            for comment in submission.comments.list():
                massComments.append(comment.body)
                i += 1
            print("Analyzed submission {}/{} from r/{} with {} comments".format(analyzed, limit, subreddit_name, i))
            analyzed += 1
        except RequestException:
            print("Request timed out while gathering data from r/{}".format(subreddit_name))
            pass
    return [len(massComments), subreddit_name]

if (not os.path.isfile(comments_file_name)):
    start_time = time.time()
    print('\n### Gathering comments ###\n')
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = []
        for subreddit in subreddits:
            print("Started analysis of", subreddit.display_name)
            futures.append(executor.submit(analyse_subreddit, subreddit=subreddit))
        for future in concurrent.futures.as_completed(futures):
            print("Got {} comments from r/{}".format(future.result()[0], future.result()[1]))
    with open(comments_file_name, "w", encoding="utf-8") as text_file:
        for comment in massComments:
            text_file.write(comment)
    print("Analyzed {} subreddits in {} seconds, with {} comments.".format(len(subreddits), time.time() - start_time, len(massComments)))
    print('\n###    Comments downloaded successfully    ###\n')
else:
    print(f"\n###    Comments file for {datestring} already exists, skipping download    ###\n")
    with open(comments_file_name, "r", encoding="utf-8") as comments_file:
        for line in comments_file:
            massComments.append(line.strip())


print('\n###    Updating mentions and ranks    ###\n')

with open('./companyMentioned.json', 'r') as s:
    comps = json.load(s)

filename = "google-10000-english-usa.txt"
  
commonWords = []
capitalCommonWords = []
acronymReddit = ["DD", "USA", "FD", "CEO", "GDP"]
commonWordsFile = open(filename)

for line in commonWordsFile:
    word = line.strip()
    commonWords.append(word)
    capitalCommonWords.append(word.capitalize())

# Above code transfers the common words into the program. Creates two dictionaries for the words, lowercase and capitalized


cleanEntry = []


for line in massComments:
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


print('\n###    Mentions and ranks updated successfully    ###\n')




with open('./companyMentioned.json', 'r') as s:
    comps = json.load(s)

# This function returns the value of Mentions.

comps.sort(key=extractMentions, reverse=True)


ts = TimeSeries(key='0RWDK629LMHCGPMI', output_format='pandas')

print('\n###    Gathering stock data    ###\n')

i = 0
for company in comps:
    if i < 50:
        try:
            data, meta_data = ts.get_daily(symbol=company["ACT Symbol"], outputsize='full')
            company["Open"] = data.iloc[0]['1. open']
            company["Close"] = data.iloc[0]['4. close']
            daily_change_dollar = Decimal( company["Close"] - company["Open"]).quantize(Decimal('.01'), rounding=ROUND_DOWN)
            daily_change_percent = Decimal((100 * (company["Close"] - company["Open"]) / company["Open"])).quantize(Decimal('.01'), rounding=ROUND_DOWN)
            company["Daily Change $"] = str(daily_change_dollar)
            company["Daily Change %"] = str(daily_change_percent)
            i += 1
            time.sleep(12)
        except ValueError:
            print("Failed to get data on " + company + ", moving on to next one.\n")
            pass

closedComps = []

i = 0
for company in comps:
    if i < 50:
        closedComps.append(company)
        i += 1


with open('companyMentioned_Stock.json', 'w') as outfile:
    json.dump(closedComps, outfile)  


print('###  Script executed successfully!   ###\n')