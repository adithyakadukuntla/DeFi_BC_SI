// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IOracle {
    function getLatestInterestRate() external view returns (uint256);
}

contract LendingContract {
    address public oracleAddress;

    struct Transaction {
        address user;
        string action; // "lend" or "borrow"
        uint256 amount;
        uint256 interestRate;
        bool success;
        uint256 timestamp;
    }

    mapping(address => uint256) public balances;
    Transaction[] public transactions;

    // ✅ Events expected by frontend
    event Lent(address indexed user, uint256 amount, uint256 blockNumber);
    event Borrowed(address indexed user, uint256 amount, uint256 repayment, uint256 blockNumber);
    event FailedTransaction(address indexed user, string reason, uint256 blockNumber);

    constructor(address _oracleAddress) {
        oracleAddress = _oracleAddress;
    }

    function lend() external payable {
        bool success = false;

        if (msg.value > 0) {
            balances[msg.sender] += msg.value;
            success = true;
            emit Lent(msg.sender, msg.value, block.number);
        } else {
            emit FailedTransaction(msg.sender, "Lend: Amount is zero", block.number);
        }

        transactions.push(Transaction({
            user: msg.sender,
            action: "lend",
            amount: msg.value,
            interestRate: 0,
            success: success,
            timestamp: block.timestamp
        }));
    }
    function borrow(uint256 amount) external {
        bool success = false;
        uint256 rate = 0;
        uint256 repayment = 0;

        try IOracle(oracleAddress).getLatestInterestRate() returns (uint256 _rate) {
            rate = _rate;
            repayment = amount + (amount * rate / 10000);

            if (address(this).balance >= amount) {
                payable(msg.sender).transfer(amount);
                balances[msg.sender] -= repayment; // Simplified logic
                success = true;
                emit Borrowed(msg.sender, amount, repayment, block.number);
            } else {
                emit FailedTransaction(msg.sender, "Borrow: Not enough funds in contract", block.number);
            }

        } catch {
            emit FailedTransaction(msg.sender, "Borrow: Oracle call failed", block.number);
        }

        transactions.push(Transaction({
            user: msg.sender,
            action: "borrow",
            amount: amount,
            interestRate: rate,
            success: success,
            timestamp: block.timestamp
        }));
    }

    function getAllTransactions() external view returns (Transaction[] memory) {
        return transactions;
    }

    function getUserTransactions(address user) external view returns (Transaction[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            if (transactions[i].user == user) {
                count++;
            }
        }

        Transaction[] memory result = new Transaction[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            if (transactions[i].user == user) {
                result[index] = transactions[i];
                index++;
            }
        }
        return result;
    }

    // Fallback function to receive ETH
    receive() external payable {}
}


