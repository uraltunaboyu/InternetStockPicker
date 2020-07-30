import pandas as pd
import json
import string


with open('./nasdaq_plus_nyse.json', 'r') as s:
    comps = json.load(s)

# Imports default list of NASDAQ and NYSE (merged)

companyTickers = []

for company in comps:
    if "ACT Symbol" not in company:
        company["ACT Symbol"] = company["Symbol"]
    if "Mentions" not in company:
        company["Mentions"] = 0
    if "LastRank" not in company:
        company["LastRank"] = "NONE"
    if "CurrentRank" not in company:
        company["CurrentRank"] = "NONE"
    if "ChangeInRank" not in company:
        company["ChangeInRank"] = "NONE"

# Init standardized Symbols
# Init Mentions to 0
# Init CurrentRank and LastRank to NONE


for company in comps:
    if company["ACT Symbol"] in companyTickers:
        company["ACT Symbol"] = "REPEATEDSYMBOL"
    else :
        companyTickers.append(company["ACT Symbol"])

# Remove repetitions in tickers.

with open('cleanedCompany.json', 'w') as outfile:
    json.dump(comps, outfile) 