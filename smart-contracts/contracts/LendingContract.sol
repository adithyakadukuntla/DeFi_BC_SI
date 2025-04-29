// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IOracle {
    function getLatestInterestRate() external view returns (uint256);
}

contract LendingContract {
    address public oracleAddress;
    mapping(address => uint256) public balances;

    constructor(address _oracleAddress) {
        oracleAddress = _oracleAddress;
    }

    function lend() external payable {
        balances[msg.sender] += msg.value;
    }

    function borrow(uint256 amount) external {
        uint256 rate = IOracle(oracleAddress).getLatestInterestRate();
        uint256 repayment = amount + (amount * rate / 10000);
        // Logic to transfer and record repayments
    }
}
