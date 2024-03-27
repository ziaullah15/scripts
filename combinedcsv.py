import pandas as pd
import glob

# Path to the current directory containing the CSV files
path = '*.csv'

# Get a list of all CSV files in the current directory
all_files = glob.glob(path)

# Initialize an empty DataFrame to store the combined data
combined_data = pd.DataFrame(columns=['HolderAddress', 'Quantity', 'PendingBalanceUpdate'])

# Loop through each CSV file
for file in all_files:
    # Read the CSV file into a DataFrame
    df = pd.read_csv(file)
    
    # Append the data from the current file to the combined_data DataFrame
    combined_data = combined_data._append(df, ignore_index=True)

# Group the combined_data by HolderAddress and sum the Quantity
combined_data = combined_data.groupby('HolderAddress', as_index=False).agg({'Quantity': 'sum', 'PendingBalanceUpdate': 'first'})

# Save the combined data to a new CSV file
combined_data.to_csv('cd.csv', index=False)
