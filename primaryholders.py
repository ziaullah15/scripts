import json

# Load the JSON data
with open('banksi2.json', 'r') as file:
    data = json.load(file)

# Filter transfer events where NFT is transferred from "0x0000000000000000000000000000000000000000"
filtered_events = [event for event in data["asset_events"] if event["event_type"] == "transfer" and event["from_address"] == "0x0000000000000000000000000000000000000000"]

# Create a dictionary to store aggregated quantities and token IDs for each address
address_info = {}

# Aggregate quantities and token IDs for each address
for event in filtered_events:
    to_address = event["to_address"]
    quantity = event["quantity"]
    token_id = event["nft"]["identifier"]  # Token ID is defined as "identifier"
    if to_address in address_info:
        address_info[to_address]["quantity"] += quantity
        address_info[to_address]["token_ids"].append(token_id)
    else:
        address_info[to_address] = {"quantity": quantity, "token_ids": [token_id]}

# Sort token IDs for each address
for info in address_info.values():
    info["token_ids"].sort()

# Create a new JSON object with desired format, aggregating quantities and sorted token IDs for each address
formatted_data = [{"address": address, "quantity": info["quantity"], "token_ids": info["token_ids"]} for address, info in address_info.items()]

# Write the formatted data to a new JSON file
with open('banksiformatids2.json', 'w') as file:
    json.dump(formatted_data, file, indent=2)

# Calculate overall quantity
overall_quantity = sum(info["quantity"] for info in address_info.values())

# Print overall quantity to console
print("Overall quantity:", overall_quantity)
