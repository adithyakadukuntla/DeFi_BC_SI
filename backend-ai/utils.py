def preprocess_input(data):
    return [
        data.get("loan_volume", 11001),
        data.get("volatility", 0.64),
        data.get("demand_index", 1.0),
    ]
