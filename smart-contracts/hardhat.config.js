// # Hardhat config for testing/deploying


require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    hardhat: {
      
    }
    // Add testnet/mainnet configs if deploying live
  }
};
