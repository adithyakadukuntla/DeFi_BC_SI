import React from 'react'

function Footer() {
  return (
    <div className="footer" style={{ padding: '20px', textAlign: 'center', }}>
        <h3>AI-Enhanced Interest Rate Model</h3>
        <p>This DeFi platform uses a machine learning model to predict optimal interest rates based on:</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>Loan amount</li>
          <li>Current loan volume in the protocol</li>
          <li>Market volatility</li>
          <li>Current demand for loans</li>
        </ul>
      </div>
  )
}

export default Footer
