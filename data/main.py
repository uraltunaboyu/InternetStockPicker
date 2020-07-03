import pandas as pd

nasdaq = pd.read_csv('nasdaqlisted.txt', sep='|', index_col=False,
                     names=['Symbol', 'Security Name', 'Market Category', 'Test Issue', 'Financial Status',
                            'Round Lot Size', 'ETF', 'NextShares'])

nasdaq = nasdaq.drop((nasdaq.columns[[2, 3, 4, 5, 7]]), axis=1)

nasdaqjson = nasdaq.to_json("nasdaq.json", orient='records')
