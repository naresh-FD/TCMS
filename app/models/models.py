import json
import os

# JSON file to act as a database
db_file = 'data.json'

def read_data():
    with open(db_file, 'r') as file:
        return json.load(file)

def write_data(data):
    with open(db_file, 'w') as file:
        json.dump(data, file, indent=4)

# Ensure the JSON store exists
if not os.path.isfile(db_file):
    with open(db_file, 'w') as file:
        json.dump({'customers': [], 'plans': []}, file)
