import datetime
import json
from pymongo import MongoClient

data_to_post = []
date = datetime.datetime.now()

try:
  companyMentioned = json.load(open(f"companyMentioned.json", "r"))
  companyMentioned_stock = json.load(open(f"companyMentioned_Stock.json", "r"))
except FileNotFoundError:
  print("Up to date company data could not be found, exiting...")
  quit()

with open("companyMentioned.json", "r") as companyMentioned:
  companies = json.load(companyMentioned)

with open("companyMentioned_Stock.json", "r") as companyMentioned:
  top_50_companies = json.load(companyMentioned)
  top_50_company_tickers = []
  for company in top_50_companies:
    top_50_company_tickers.append(company["ACT Symbol"])

def get_company_from_top_50(symbol):
  for company in top_50_companies:
    if company["ACT Symbol"] == symbol:
      return company

client = MongoClient("mongodb+srv://admin:vLrRHmq2DuDd4rhY@cluster0.uhppr.mongodb.net/parsedComments?retryWrites=true&w=majority")
db = client.internetstockpicks
parsedComments = db.parsedComments

for company in companies:
  if company["ACT Symbol"] in top_50_company_tickers:
    company = get_company_from_top_50(company["ACT Symbol"])
    data_to_post.append({
      "date": datetime.datetime.now(),
      "symbol": company["ACT Symbol"],
      "companyName": company["Company Name"],
      "rank": company["CurrentRank"],
      "rankChange": company["ChangeInRank"],
      "stockData" : {
        "stockOpen": company["Open"],
        "stockClose": company["Close"],
        "stockChangePercent": company["Daily Change %"],
        "stockChangeDollar": company["Daily Change $"],
      }
    })
  else :
    data_to_post.append({
      "date": datetime.datetime.now(),
      "symbol": company["ACT Symbol"],
      "companyName": company["Company Name"],
      "rank": company["CurrentRank"],
      "rankChange": company["ChangeInRank"]
    })

result = parsedComments.insert_many(data_to_post)
print(len(result.inserted_ids))
