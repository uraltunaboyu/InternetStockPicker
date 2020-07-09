import pandas as pd
import json
import string

with open('./URS/scrapes/07-09-2020/c-Daily Discussion Thread for July 09, 2020-RAW.json', 'r') as f:
    data = json.load(f)

for index in data:
    print(index)