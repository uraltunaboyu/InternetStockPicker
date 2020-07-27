import json
from alpha_vantage.timeseries import TimeSeries
import time



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
    if i < 10:
        data, meta_data = ts.get_daily(symbol=company["ACT Symbol"], outputsize='full')
        company["Close"] = data.iloc[0]['4. close']
        i += 1
        time.sleep(12)


with open('companyMentioned_Stock.json', 'w') as outfile:
    json.dump(comps, outfile)  