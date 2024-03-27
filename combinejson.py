import json

def combine_json(json_file1, json_file2):
    # Load JSON data from the first file
    with open(json_file1, 'r') as f1:
        data1 = json.load(f1)

    # Load JSON data from the second file
    with open(json_file2, 'r') as f2:
        data2 = json.load(f2)

    # Extract addresses from both datasets
    addresses1 = {entry['address']: entry['quantity'] for entry in data1}
    addresses2 = {entry['address']: entry['quantity'] for entry in data2}

    # Find common addresses
    common_addresses = set(addresses1.keys()).intersection(addresses2.keys())

    # Generate new JSON data with common addresses and minimum quantity
    combined_data = []
    total_quantity = 0
    for addr in common_addresses:
        min_quantity = min(addresses1[addr], addresses2[addr])
        combined_data.append({'address': addr, 'quantity': min_quantity})
        total_quantity += min_quantity

    # Print total quantity to console
    print("Total Quantity:", total_quantity)

    # Print combined data
    print("Combined Data:")
    for entry in combined_data:
        print(entry)

# Example usage:
combine_json('banksioutputupdated.json', 'streetoutputupdated.json')
