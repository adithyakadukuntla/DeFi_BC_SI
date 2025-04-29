import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load dataset
df = pd.read_csv("data/loan_data.csv")
X = df[['loan_volume', 'volatility', 'demand_index']]
y = df['interest_rate']

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)

# Save model
joblib.dump(model, "model/interest_model.pkl")
print("Model trained and saved successfully.")
