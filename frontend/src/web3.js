import { ethers } from "ethers";
import LendingContractABI from "./abis/LendingContract.json";
const abi = LendingContractABI.abi;
const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export const getBlockchain = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    return { contract, signer };
  } else {
    alert("Please install MetaMask!");
    return null;
  }
};
