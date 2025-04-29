import React, { useState } from 'react';
import { getBlockchain } from '../web3';
import { ethers } from 'ethers';
const LendForm = () => {
  const [amount, setAmount] = useState("");

  const handleLend = async () => {
    const { contract } = await getBlockchain();
    const tx = await contract.lend({ value: ethers.parseEther(amount) });
    await tx.wait();
    alert("Lent successfully!");
  };

  return (
    <div>
      <h2>Lend Funds</h2>
      <input
        type="number"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleLend}>Lend</button>
    </div>
  );
};

export default LendForm;
