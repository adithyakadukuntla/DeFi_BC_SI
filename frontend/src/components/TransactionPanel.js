import React, { useEffect, useState } from 'react';
import './TransactionPanel.css'; // Make sure to create this CSS file

function TransactionPanel() {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/latest-tx')
      .then(res => res.json())
      .then(data => setTxs(Array.isArray(data) ? data : []));
  }, []);

  if (!txs.length) return <div className="tp-center tp-mt">Loading transactions...</div>;

  return (
    <div className="tp-container">
      <h2 className="tp-title">All Transactions</h2>
      <div className="tp-blockchain">
        {txs.map((tx, idx) => (
          <React.Fragment key={tx.transactionHash}>
            <div className="tp-block">
              <div className="tp-block-label">Block</div>
              <div><b>Transaction:</b> {tx.transactionHash}</div>
              <div><b>From:</b> {tx.from}</div>
              <div><b>To:</b> {tx.to}</div>
              <div><b>Value:</b> {tx.value} ETH</div>
              <div><b>Gas Used:</b> {tx.gasUsed}</div>
              <div><b>Block Hash:</b> {tx.blockHash}</div>
            </div>
            {/* Chain visual between blocks, but not after the last block */}
            {idx < txs.length - 1 && (
              <div className="tp-chain">
                {/* <div className="tp-chain-line"></div> */}
                <div className="tp-chain-icon">⛓️</div>
                 <div className="tp-chain-icon">⛓️</div>
                  <div className="tp-chain-icon">⛓️</div>
                   <div className="tp-chain-icon">⛓️</div>
                   <div className="tp-chain-icon">⛓️</div>
                   <div className="tp-chain-icon">⛓️</div>

              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default TransactionPanel;
