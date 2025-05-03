import React, { useState, useEffect } from 'react';
import { getBlockchain, getAccountBalance } from '../web3';
import LendForm from './LendForm';
import BorrowForm from './BorrowForm';

const DemoPanel = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0");
  const [contractBalance, setContractBalance] = useState("0");
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    const init = async () => {
      try {
        const { signer, contract } = await getBlockchain();
        const address = await signer.getAddress();
        setAccount(address);
        
        // Get account balance
        const userBalance = await getAccountBalance(address);
        setBalance(userBalance);
        
        // Get contract balance (if you have a function for this)
        const contractAddress = await contract.getAddress();
        const contractBal = await getAccountBalance(contractAddress);
        setContractBalance(contractBal);
        
        setIsConnected(true);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    
    init();
  }, []);
  
  return (
    <div className="demo-panel">
      
      <div className="background-image">
        <img src="https://ethereum.org/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fhero.94a1ecc4.png&w=1920&q=75" alt="Background" className="background" style={{width:'100%',height:'100%'}} />
       
      </div>
      
      <div className="welcome-message text-center w-50 mx-auto pt-3" style={{color:'black'}}>
        <h1 >Welcome to the AI-Optimized DeFi Lending Platform</h1>
        <h5>Connect your wallet to start lending and borrowing.</h5>
        <p>The leading platform for innovative apps and blockchain networks</p>
      </div>
      
      <div className="account-info">
        <h2>Account Information</h2>
        {isConnected ? (
          <>
            <p><strong>Account:</strong> {account}</p>
            <p><strong>Balance:</strong> {parseFloat(balance).toFixed(4)} ETH</p>
          </>
        ) : (
          <p>Connecting to blockchain...</p>
        )}
      </div>
      
      <div className="pool-info">
        <h3>Lending Pool</h3>
        <p><strong>Total Value Locked:</strong> {parseFloat(contractBalance).toFixed(4)} ETH</p>
      </div>
      
      <div className="actions">
        <div className="action-card">
          <LendForm />
        </div>
        <div className="pool-info">
        <h3>Borrowing Pool</h3>
        <p><strong>Total Value Locked:</strong> {parseFloat(contractBalance).toFixed(4)} ETH</p>
      </div>
         
        
        <div className="action-card">
          <BorrowForm />
        </div>
      </div>
      
      
    </div>
  );
};

export default DemoPanel;