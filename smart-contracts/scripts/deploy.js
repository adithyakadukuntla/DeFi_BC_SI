const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  // Replace with your actual oracle contract address or mock one for testing
  const oracleAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

  const LendingContract = await hre.ethers.getContractFactory("LendingContract");

  // Deploy the contract
  const lendingContract = await LendingContract.deploy(oracleAddress);

  // Wait for the contract to be deployed and mined
  await lendingContract.deployTransaction.wait();

  console.log("LendingContract deployed to:", lendingContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
