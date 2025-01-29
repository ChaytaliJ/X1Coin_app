// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking is ReentrancyGuard {
    IERC20 public token;
    uint256 public constant REWARD_RATE = 10; // 10% annually
    struct Stake { uint256 amount; uint256 timestamp; }
    mapping(address => Stake) public stakes;

    constructor(address _token) {
        require(_token != address(0), "Invalid token address");
        token = IERC20(_token);
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot stake 0 tokens");
        token.transferFrom(msg.sender, address(this), amount);
        stakes[msg.sender] = Stake(amount, block.timestamp);
    }

    function unstake() external nonReentrant {
        require(block.timestamp >= stakes[msg.sender].timestamp + 30 days, "Staking period not over");
        uint256 amount = stakes[msg.sender].amount;
        uint256 reward = (amount * REWARD_RATE * (block.timestamp - stakes[msg.sender].timestamp)) / (365 days * 100);
        token.transfer(msg.sender, amount + reward);
        delete stakes[msg.sender];
    }
    
}
