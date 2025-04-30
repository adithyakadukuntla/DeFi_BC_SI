# 🏦 DeFi Lending DApp — AI-Powered Borrowing Platform

A decentralized lending platform powered by **blockchain** and **AI**. Users can borrow ETH from the platform at a dynamically predicted interest rate, calculated using a machine learning model based on financial parameters like loan amount, demand, and volatility.



## 🔍 Project Overview

This project combines **DeFi** with **AI** to create a smart lending application:

- Users borrow ETH through a smart contract.
- The borrowing interest rate is **predicted in real-time** using a Flask API with a trained ML model.
- The interest rate prediction is based on inputs such as:
  - Loan Amount
  - Market Volatility
  - Demand
  - Existing Loan Volume

The system ensures better dynamic pricing for interest rates and adds intelligence to decentralized finance.

---

## 🚀 How to Start the Project (Step-by-Step)

### 1️⃣ Start the Hardhat Node
```bash
cd smart-contracts
npx hardhat node
```

### 2️⃣ Deploy the Smart Contract
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 3️⃣ Start the Flask ML Server
```bash
cd server
pip install -r requirements.txt
python app.py
```
> Make sure your `app.py` contains a `/predict` POST endpoint that returns an interest rate.

### 4️⃣ Start the React Frontend
```bash
cd client
npm install
npm start
```

---

## ⚙️ Technologies Used

- **Solidity** – Smart contract for lending logic
- **Hardhat** – Ethereum development environment
- **Flask** – Python backend for ML-based interest rate prediction
- **Scikit-Learn** – ML model training
- **React.js** – User interface
- **Ethers.js** – Interacts with Ethereum blockchain
- **MetaMask** – For signing and sending transactions

---

## 💡 Why This Project?

- 💸 **Real-Time Adaptive Lending** – Predicts interest rates based on market conditions.
- 🔐 **Decentralized** – Everything is powered on Ethereum, with no centralized authority.
- 🤖 **AI + DeFi** – Introduces machine learning for financial decision-making in a DeFi environment.
- 🧑‍💻 **Great Learning Project** – Combines Web3, AI, and modern frontend frameworks.

---

## 🧠 How It Works

1. User enters the amount they want to borrow on the frontend.
2. React frontend sends data to Flask API.
3. Flask server returns a predicted interest rate using the trained ML model.
4. The smart contract is called with the borrowing amount and interest rate.
5. The contract processes the loan and stores repayment data.

---

## 🛠️ Developer Notes

- The `borrow(amount)` function in the contract uses `getLatestInterestRate()` from an `IOracle` interface.
- The React app uses `ethers.parseEther(amount)` and `ethers.parseUnits(rate.toString(), 3)` for precision.
- MetaMask is used to confirm transactions.
- Flask ML endpoint must return interest rates with **3 decimal places max** to avoid `NUMERIC_FAULT` errors.

---

## 📬 Feedback

Feel free to contribute or suggest features! This is a growing project bridging **AI + Blockchain** for smarter finance.



