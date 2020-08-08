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
      "Symbol": company["ACT Symbol"],
      "CompanyName": company["Company Name"],
      "Rank": company["CurrentRank"],
      "RankChange": company["ChangeInRank"],
      "StockOpen": company["Open"],
      "StockClose": company["Close"],
      "StockChangePercent": company["Daily Change %"],
      "StockChangeDollar": company["Daily Change $"],
      "Date": f"{date:%d %b %Y}"
    })
  else :
    data_to_post.append({
      "Symbol": company["ACT Symbol"],
      "CompanyName": company["Company Name"],
      "Rank": company["CurrentRank"],
      "RankChange": company["ChangeInRank"],
      "Date": f"{date:%d %b %Y}"
    })

result = parsedComments.insert_many(data_to_post)
print(len(result.inserted_ids))
