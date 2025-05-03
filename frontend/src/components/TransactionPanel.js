import React, { useEffect, useState } from 'react';
import LendingContractABI from '../abis/LendingContract.json'; // adjust path if needed
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const TransactionPanel = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // ethers v6 syntax for getting provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, LendingContractABI.abi, provider);

        // Filter events in ethers v6
        const lendFilter = contract.filters.Lent();
        const borrowFilter = contract.filters.Borrowed();  
        const failFilter = contract.filters.FailedTransaction();

        // Get events using the new querying method
        const lendEvents = await contract.queryFilter(lendFilter);
        const borrowEvents = await contract.queryFilter(borrowFilter);
        const failEvents = await contract.queryFilter(failFilter);

        const allEvents = [...lendEvents, ...borrowEvents, ...failEvents];

        // Sort by block number (descending)
        allEvents.sort((a, b) => b.blockNumber - a.blockNumber);

        const withTimestamps = await Promise.all(allEvents.map(async (event) => {
          const block = await provider.getBlock(event.blockNumber);
          return {
            type: event.fragment.name, // Updated from event.event
            user: event.args[0], // Access by index instead of name in v6
            amount: event.args[1]?.toString() || '0',
            repayment: event.args[2]?.toString() || null,
            reason: event.args[1]?.toString() || null, // For FailedTransaction, reason is the second arg
            blockNumber: event.blockNumber,
            timestamp: new Date(Number(block.timestamp) * 1000).toLocaleString(),
          };
        }));

        setTransactions(withTimestamps);
      } catch (err) {
        console.error("Error loading transactions:", err);
      }
    };

    if (window.ethereum) {
      fetchTransactions();
    } else {
      console.error("MetaMask or another Ethereum provider not found");
    }
  }, []);

  return (
    <div className="transactions-panel pt-5 p-3">
      <h2>📜 Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found. Make sure your wallet is connected to the correct network.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Type</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Amount (wei)</th>
              <th className="border p-2">Repayment</th>
              <th className="border p-2">Reason (if failed)</th>
              <th className="border p-2">Block #</th>
              <th className="border p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border p-2">{tx.type}</td>
                <td className="border p-2">{tx.user}</td>
                <td className="border p-2">{tx.amount}</td>
                <td className="border p-2">{tx.repayment || '-'}</td>
                <td className="border p-2">{tx.reason || '-'}</td>
                <td className="border p-2">{tx.blockNumber}</td>
                <td className="border p-2">{tx.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionPanel;