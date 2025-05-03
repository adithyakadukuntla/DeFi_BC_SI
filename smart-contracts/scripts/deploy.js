const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  
  const oracleAddress = "0xdD2FD4581271e230360230F9337D5c0430Bf44C0";

  const LendingContract = await hre.ethers.getContractFactory("LendingContract");

  const lendingContract = await LendingContract.deploy(oracleAddress);
  

  await lendingContract.waitForDeployment();
  
  
  const contractAddress = await lendingContract.getAddress();

  console.log("LendingContract deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });