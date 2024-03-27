import csv
import json

def process_csv(csv_file):
    to_address_quantities = {}
    total_quantity = 0
    with open(csv_file, 'r', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            to_address = row['To']
            token_id = row['Token_ID']
            quantity = 1  # Assuming each row represents one token
            
            total_quantity += quantity
            
            if to_address not in to_address_quantities:
                to_address_quantities[to_address] = {}
            if token_id not in to_address_quantities[to_address]:
                to_address_quantities[to_address][token_id] = 0
            
            to_address_quantities[to_address][token_id] += quantity
    
    return to_address_quantities, total_quantity

def generate_json(to_address_quantities):
    json_data = []
    for to_address, tokens in to_address_quantities.items():
        total_quantity = sum(tokens.values())
        json_data.append({"to_address": to_address, "quantity": total_quantity})
    
    return json_data

def write_json(json_data, output_file):
    with open(output_file, 'w') as jsonfile:
        json.dump(json_data, jsonfile, indent=4)

def main():
    csv_file = 'street.csv'  # Change this to your CSV file path
    output_json_file = 'streetoutputupdated.json'  # Change this to your desired output JSON file path
    
    to_address_quantities, total_quantity = process_csv(csv_file)
    json_data = generate_json(to_address_quantities)
    write_json(json_data, output_json_file)
    
    print("JSON file generated successfully!")
    print("Total Quantity:", total_quantity)

if __name__ == "__main__":
    main()
