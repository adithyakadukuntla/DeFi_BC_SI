import React, { useState } from 'react';
import { getBlockchain } from '../web3';
import { ethers } from 'ethers';
import axios from 'axios';

const BorrowForm = () => {
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiServiceError, setAiServiceError] = useState(false);

  const fetchInterestRate = async () => {
    try {
      setAiServiceError(false);
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        amount: parseFloat(amount),
        loan_volume: 10000,
        volatility: 0.05,
        demand: 200
      });
  
      console.log("Fetched interest rate:", response.data);
      return response.data.interest_rate;
    } catch (err) {
      console.error("Error fetching interest rate:", err);
      setAiServiceError(true);
      // Return a fallback interest rate for demo purposes
      return 5.0; // 5% fallback rate
    }
  };

  const handleBorrow = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const rate = await fetchInterestRate();
      setInterestRate(rate);
      
      const { contract } = await getBlockchain();
      const tx = await contract.borrow(ethers.parseEther(amount));
      await tx.wait();
      
      alert(`Borrowed ${amount} ETH successfully at interest rate: ${rate}%`);
      setAmount("");
    } catch (error) {
      if (error.code === 4001) {
        alert("Transaction was cancelled by the user.");
      } else {
        console.error("Transaction error:", error);
        alert("Error during transaction: " + (error.message || "Unknown error"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="borrow-form" style={styles.BorrowForm}>
      <h2>Borrow Funds</h2>
      <div className="form-group" style={styles.formGroup}>
        <input
          type="number"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
          style={styles.InputField}
        />
        <button onClick={handleBorrow} disabled={loading} className='btn btn-success'>
          {loading ? "Processing..." : "Borrow"}
        </button>
      </div>
      
      {interestRate !== null && (
        <div className="rate-display">
          <p><strong>Predicted Interest Rate:</strong> {interestRate}%</p>
          {aiServiceError && (
            <p className="error-note">
              Note: Using fallback interest rate due to AI service connection issue.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BorrowForm;


const styles = {
  BorrowForm: {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  formGroup: {
    display: 'flex',
    maxWidth: '400px',
    margin: '0 auto',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  InputField:{
    width: '90%',
    padding: '8px',
    margin:'10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  }
};