import React, { useState } from 'react';
import { getBlockchain } from '../web3';
import { ethers } from 'ethers';

const LendForm = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState("");

  const handleLend = async () => {
    // Input validation
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setError("");
    setLoading(true);
    setTransactionHash("");
    
    try {
      const { contract } = await getBlockchain();
      const tx = await contract.lend({ value: ethers.parseEther(amount) });
      
      // Display pending transaction info
      setTransactionHash(tx.hash);
      
      // Wait for transaction confirmation
      await tx.wait();
      
      // Show success message
      alert(`Successfully lent ${amount} ETH to the protocol!`);
      
      // Reset form
      setAmount("");
    } catch (error) {
      console.error("Lending error:", error);
      
      // Handle common errors
      if (error.code === 4001) {
        setError("Transaction was cancelled by user");
      } else if (error.code === "INSUFFICIENT_FUNDS") {
        setError("Insufficient funds in your wallet");
      } else {
        setError(`Transaction failed: ${error.message || "Unknown error"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lend-form" style={styles.lendForm}>
      <h2>Lend Funds</h2>
      <div className="form-group " style={styles.formGroup}>
        <input
          type="number"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
          className={error ? "input-error" : ""}
          style={styles.InputField}
        />
        <button 
          onClick={handleLend} 
          disabled={loading}
          className={loading ? "btn btn-loading" : "btn btn-primary"}
        >
          {loading ? "Processing..." : "Lend"}
        </button>
        
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {transactionHash && (
        <div className="transaction-info">
          <p>Transaction submitted: {transactionHash.substring(0, 10)}...
            {loading && <span className="spinner"></span>}
          </p>
        </div>
      )}
      
      {/* Optional: Add estimated returns information */}
      {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && (
        <div className="estimated-returns">
          <p>Estimated annual yield: ~3.5%</p>
          <p>Estimated earnings: ~{(parseFloat(amount) * 0.035).toFixed(4)} ETH/year</p>
        </div>
      )}
    </div>
  );
};

export default LendForm;

const styles = {
  lendForm: {
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
