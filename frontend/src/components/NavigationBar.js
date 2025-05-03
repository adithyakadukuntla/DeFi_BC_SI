import React from "react";
import { Link } from "react-router-dom"

function NavigationBar() {
  return (
    <div>
      {/* Give navbar with heading and two links to home and transaction history */}

      <nav className="navbar navbar-expand-lg navbar-light  fixed-top   bg-light  " style={{ backgroundColor: "" }}>
        <div className="container-fluid">
          <img src="https://img.icons8.com/ios-filled/50/000000/ethereum.png" alt="Ethereum Logo" style={{ width: "50px", height: "50px" }} />
          <Link className="navbar-brand ps-5 p-2" to='/'>
            <h2>🧠 AI-Optimized DeFi Lending Platform</h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex justify-content-end w-100">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transaction-history">
                  Transaction History
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;
