import pandas as pd
import json
import string

nasdaq = pd.read_csv('nasdaqlisted.txt', sep='|', index_col=False,
                     names=['Symbol', 'Security Name', 'Market Category', 'Test Issue', 'Financial Status',
                            'Round Lot Size', 'ETF', 'NextShares'])

nasdaq = nasdaq.drop((nasdaq.columns[[2, 3, 4, 5, 7]]), axis=1)

with open('./nasdaq.json') as f:
    data = json.load(f)

oldName = "TestName"


for i in data:
    if i["Security Name"] is not None:
        fullName = i["Security Name"]
        splitName = fullName.split(" ")
        if (splitName[0] == "The"):
            realName = splitName[1]
        else :
            realName = splitName[0]
    if realName == oldName:
        i["Security Name"] == None
    else:
        i["Security Name"] = realName
        oldName = realName

for i in data:
    if i["Security Name"] is not None:
        fullName = i["Security Name"]
        splitName = fullName.split(",")[0]
        i["Security Name"] = splitName
        print(i["Security Name"])  


#for i in data:
#    if i["Security Name"] is not None:
#        fullName = i["Security Name"]
#        splitName = fullName.split(",")[0]
#        splitName = splitName.split(" - ")[0]
#        splitName = splitName.split("Inc")[0]
#        splitName = splitName.split(" Holding")[0]
#        splitName = splitName.split(" Group")[0]
#        splitName = splitName.split(" Corporation")[0]
#        splitName = splitName.split("Company")[0]
#        splitName = splitName.split("Corp.")[0]
#        splitName = splitName.split(" Ltd.")[0]
#        splitName = splitName.split("LP")[0]
#        splitName = splitName.split("Financial")[0]
#        splitName = splitName.split("Trust")[0]
#        splitName = splitName.split("Financial")[0]
#        splitName = splitName.split("ETF")[0]
#        splitName = splitName.split("N.A")[0]
#        if splitName == oldName:
#            i["Security Name"] = None
#        else:
#            i["Security Name"] = splitName
#            print(i["Security Name"])
#            oldName = splitName



for element in data:
    if element["Security Name"] is None:
        element["Symbol"] = None

with open('clean_nasdaq.json', 'w') as f:
    json.dump(data, f)