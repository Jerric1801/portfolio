import pandas as pd
import json

files = ["america", "australia", "asia"]
my_dict = {}

for f in files:
    temp = []
    df = pd.read_csv(f"./{f}.csv")
    for long, lat in zip(df['long'], df['lat']):
        temp.append([(long + 180)/360 * 1000, 500 - (lat + 90)/180 * 500])
        # temp.append([long, lat])
    my_dict[f] = temp

with open("output.json", 'w') as json_file:
    json.dump(my_dict, json_file, indent=4)

print(my_dict)
    