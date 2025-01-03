from flask import Flask, jsonify
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from flask_cors import CORS

app = Flask(__name__)

# Apply CORS globally
CORS(app, origins=["http://localhost:3000"])

# Fetch data from Google Sheets
def fetch_data():
    # Define the scope and authenticate
    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('C:/Users/egods/Downloads/credentials.json', scope)
    client = gspread.authorize(creds)

    # Use spreadsheet ID
    spreadsheet_id = "1kD8ioh3KYPgZ7x00hzvqqj-6juW-rMY8Y3ptgRx0FbQ"
    sheet = client.open_by_key(spreadsheet_id).sheet1

    # Fetch all records
    data = sheet.get_all_records()
    return data

@app.route('/data', methods=['GET'])
def get_data():
    data = fetch_data()  # Fetch player data
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)