const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  // Replace with your actual oracle contract address or mock one for testing
  const oracleAddress = "0xdD2FD4581271e230360230F9337D5c0430Bf44C0";

  const LendingContract = await hre.ethers.getContractFactory("LendingContract");

  // Deploy the contract
  const lendingContract = await LendingContract.deploy(oracleAddress);
  
  // Wait for the contract to be deployed
  await lendingContract.waitForDeployment();
  
  // Get the deployed contract address
  const contractAddress = await lendingContract.getAddress();

  console.log("LendingContract deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });