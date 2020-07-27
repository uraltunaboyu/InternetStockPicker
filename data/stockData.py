import json
from alpha_vantage.timeseries import TimeSeries
from pprint import pprint



with open('./companyMentioned.json', 'r') as s:
    comps = json.load(s)

ts = TimeSeries(key='0RWDK629LMHCGPMI', output_format='pandas')


""" for company in comps:
    data, meta_data = ts.get_intraday(symbol=company["ACT Symbol"])
    for i, date in enumerate(data):
        if i == 1:
            company["LastClose"] = data[i]['close'] """


data, meta_data = ts.get_daily(symbol='MSFT', outputsize='full')
print(data.iloc[0]['4. close'])


""" with open('companyMentioned_Stock.json', 'w') as outfile:
    json.dump(comps, outfile)   """