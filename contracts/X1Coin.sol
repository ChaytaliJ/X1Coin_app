// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract X1Coin is ERC20, Ownable {
    uint256 public constant LOCK_PERIOD = 180 days;
    mapping(address => uint256) private _lockTime;

    constructor(address teamWallet, address communityWallet) ERC20("X1Coin", "X1C") Ownable(msg.sender) {
        require(teamWallet != address(0), "Invalid team wallet");
        require(communityWallet != address(0), "Invalid community wallet");

        _mint(msg.sender, 500_000_000 * 10 ** decimals()); // Public Sale
        _mint(teamWallet, 300_000_000 * 10 ** decimals()); // Team & Advisors (Locked)
        _mint(communityWallet, 200_000_000 * 10 ** decimals()); // Community Development

        _lockTime[teamWallet] = block.timestamp + LOCK_PERIOD;
    }


    function transfer(address recipient, uint256 amount) public override returns (bool) {
    require(block.timestamp >= _lockTime[msg.sender], "Tokens are locked!");
    return super.transfer(recipient, amount);
}


}
