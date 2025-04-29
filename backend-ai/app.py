from flask import Flask, request, jsonify
import joblib
import pandas as pd
from utils import preprocess_input
from flask_cors import CORS
app = Flask(__name__)


model = joblib.load('model/interest_model.pkl')
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

if __name__ == '__main__':
    app.run(port=5000)
