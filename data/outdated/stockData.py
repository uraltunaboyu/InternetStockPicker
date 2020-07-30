import json
from alpha_vantage.timeseries import TimeSeries
import time
from decimal import *



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