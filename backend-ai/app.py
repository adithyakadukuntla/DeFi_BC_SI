from flask import Flask, request, jsonify
import joblib
import pandas as pd
from utils import preprocess_input
from flask_cors import CORS
import json
import os
from extract_log import extract_all_logs
app = Flask(__name__)


model = joblib.load('model/linear_regression_model.pkl')
CORS(app)


@app.route('/')
def home():
    return "Welcome to the Interest Rate Prediction API!"


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = preprocess_input(data)
    prediction = model.predict([features])[0]
    return jsonify({'interest_rate': round(prediction, 4)})

@app.route('/latest-tx', methods=['GET'])
def latest_tx():
    try:
        extract_all_logs()
        output_path = os.path.join(os.path.dirname(__file__), 'tx_data.json')
        if not os.path.exists(output_path):
            return jsonify({"error": "No transactions found"}), 404

        with open(output_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        print("Error in /latest-tx:", str(e))
        return jsonify({"error": "Server error"}), 500



if __name__ == '__main__':
    app.run(port=5000)
