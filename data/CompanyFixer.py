import pandas as pd
import json
import string


with open('./nasdaq_plus_nyse.json', 'r') as s:
    comps = json.load(s)


companyTickers = []

for company in comps:
    if "ACT Symbol" not in company:
        company["ACT Symbol"] = company["Symbol"]


for company in comps:
    if company["ACT Symbol"] in companyTickers:
        company["ACT Symbol"] = "REPEATEDSYMBOL"
    else :
        companyTickers.append(company["ACT Symbol"])



with open('cleanedCompany.json', 'w') as outfile:
    json.dump(comps, outfile) 