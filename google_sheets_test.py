import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os

# Debug: Print the current working directory
print ("Current working directory", os.getcwd())

# Define the scope
scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']

# Authenticate using the credentials JSON file
creds = ServiceAccountCredentials.from_json_keyfile_name('C:/Users/egods/Downloads/credentials.json', scope)
client = gspread.authorize(creds)

# Open the Google Sheet
spreadsheet_id = "1kD8ioh3KYPgZ7x00hzvqqj-6juW-rMY8Y3ptgRx0FbQ"
sheet = client.open_by_key(spreadsheet_id).sheet1

# Fetch data
data = sheet.get_all_records()
print(data)
