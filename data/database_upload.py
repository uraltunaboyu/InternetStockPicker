import datetime
import json
from pymongo import MongoClient

data_to_post = []
date = datetime.datetime.now()

with open("companyMentioned.json", "r") as companyMentioned:
  companies = json.load(companyMentioned)

client = MongoClient("mongodb+srv://admin:vLrRHmq2DuDd4rhY@cluster0.uhppr.mongodb.net/parsedComments?retryWrites=true&w=majority")
db = client.internetstockpicks
parsedComments = db.parsedComments

for company in companies:
  data_to_post.append({
    "Symbol": company["ACT Symbol"],
    "CompanyName": company["Company Name"],
    "Rank": company["CurrentRank"],
    "RankChange": company["ChangeInRank"],
    "Date": f"{date:%d %b %Y}"
  })

result = parsedComments.insert_many(data_to_post)
print(len(result.inserted_ids))
