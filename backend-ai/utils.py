def preprocess_input(data):
    return [
        data.get("loan_volume", 10000),
        data.get("volatility", 0.5),
        data.get("demand_index", 1.0),
    ]
