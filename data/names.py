import json


with open("companyMentioned.json", "r") as companyMentioned:
  companies = json.load(companyMentioned)

for company in companies:
    nameParsed = company["Company Name"].split()
    correctName = []
    for word in nameParsed:
        correctName.append(word)
        if "Inc." in correctName:
            break
        if "LP" in correctName:
            break
        if "LLC" in correctName:
            break
        if "Holding" in correctName:
            break
        if "Limited" in correctName:
            break
        if "Company" in correctName:
            break
        if "Common" in correctName and "Stock" in correctName:
            correctName.remove("Common")
            correctName.remove("Stock")
            break
        correctName.append(" ")

    name = ''
    name = name.join(correctName)
    name = name.strip()
    company["Company Name"] = name

with open('companyMentionedNames.json', 'w') as outfile:
    json.dump(companies, outfile)  
