import csv
import json

# Define a function to handle multiline entries
def read_csv(filename):
    data = []
    with open(filename, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=';')
        for row in reader:
            # Check for multiline entries and concatenate them
            for key, value in row.items():
                if '\n' in value:
                    row[key] = value.replace('\n', ' ')
            data.append(row)
    return data

# Convert CSV data to JSON
def convert_to_json(csv_data, json_filename):
    with open(json_filename, 'w', encoding='utf-8') as jsonfile:
        json.dump(csv_data, jsonfile, ensure_ascii=False, indent=4)

# Example usage
filename = 'contratos2024.csv'
json_filename = 'contratos2024.json'

# Read CSV data
csv_data = read_csv(filename)

# Convert to JSON
convert_to_json(csv_data, json_filename)