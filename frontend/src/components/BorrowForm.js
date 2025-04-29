import React, { useState } from 'react';
import { getBlockchain } from '../web3';
import { ethers } from 'ethers';
import axios from 'axios';
const BorrowForm = () => {
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState(null);

  const fetchInterestRate = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        amount: parseFloat(amount),
        loan_volume: 10000,   // You can make this dynamic
        volatility: 0.05,
        demand: 200
      });
  
      console.log("Fetched interest rate:", response.data);
      return response.data.interest_rate;
    } catch (err) {
      console.error("Error fetching interest rate:", err);
      return null;
    }
  };

  const handleBorrow = async () => {
    const rate = await fetchInterestRate();
    setInterestRate(rate);
    
    if (rate == null) {
      alert("Failed to fetch interest rate.");
      return;
    }

    const { contract } = await getBlockchain();
    try {
      const tx = await contract.borrow(ethers.parseEther(amount));
      await tx.wait();
      alert(`Borrowed at interest rate: ${rate}%`);
    } catch (error) {
      if (error.code === 4001) {
        alert("Transaction was cancelled by the user.");
      } else {
        console.error("Transaction error:", error);
        alert("Transaction was cancelled by the user.");
      }
    }
    
  };

  return (
    <div>
      <h2>Borrow Funds</h2>
      <input
        type="number"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleBorrow}>Borrow</button>
      {interestRate && <p>Predicted Interest Rate: {interestRate}%</p>}
    </div>
  );
};

export default BorrowForm;
