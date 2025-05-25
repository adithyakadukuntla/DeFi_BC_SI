import { ethers } from "ethers";
import LendingContractABI from "./abis/LendingContract.json";
const abi = LendingContractABI.abi;
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const getBlockchain = async () => {
  let provider, signer, contract;
  
  // Check if MetaMask is installed
  if (window.ethereum) {
    try {
      // Connect to MetaMask
      provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Check if we're on the correct network
      const network = await provider.getNetwork();
      
      // Hardhat network chainId is 31337
      if (network.chainId !== 31337n) {
        try {
          // Try to switch to Hardhat network
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7A69' }], // 31337 in hex
          });
          // Refresh provider after network switch
          provider = new ethers.BrowserProvider(window.ethereum);
        } catch (switchError) {
          // This error code indicates that the chain hasn't been added to MetaMask
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x7A69', // 31337 in hex
                  chainName: 'Hardhat Local',
                  nativeCurrency: {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: ['http://127.0.0.1:8545'],
                },
              ],
            });
            // Refresh provider after adding network
            provider = new ethers.BrowserProvider(window.ethereum);
          } else {
            throw switchError;
          }
        }
      }
      
      signer = await provider.getSigner();
      contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      return { provider, signer, contract };
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      
      // Fallback to local provider if MetaMask connection fails
      provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      signer = await provider.getSigner(0); // Use the first account from Hardhat
      contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      return { provider, signer, contract };
    }
  } else {
    // No MetaMask, just use local provider
    console.log("MetaMask not installed, using local provider");
    provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    signer = await provider.getSigner(0); // Use the first account from Hardhat
    contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    return { provider, signer, contract };
  }
};

// Helper function to get account balance
export const getAccountBalance = async (address) => {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
};