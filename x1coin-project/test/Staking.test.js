const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking Contract", function () {
    let X1Coin, Staking, x1coin, staking, owner, user;

    beforeEach(async function () {
        try {
            [owner, user] = await ethers.getSigners();

            // Deploy X1Coin
            X1Coin = await ethers.getContractFactory("X1Coin");
            x1coin = await X1Coin.deploy(owner.address, owner.address);
            await x1coin.waitForDeployment(); // ✅ Correct way to wait for deployment

            // Deploy Staking contract
            Staking = await ethers.getContractFactory("Staking");
            staking = await Staking.deploy(await x1coin.getAddress()); // ✅ Pass correct address
            await staking.waitForDeployment(); // ✅ Correct way to wait for deployment
        } catch (error) {
            console.error("Error in beforeEach hook:", error);
            throw error;
        }
    });

    it("Should allow users to stake tokens", async function () {
        // Fast-forward 6 months to unlock tokens
        await ethers.provider.send("evm_increaseTime", [180 * 24 * 60 * 60]); 
        await ethers.provider.send("evm_mine");
        // Now transfer tokens
        await x1coin.transfer(user.address, 1000);
        await x1coin.connect(user).approve(await staking.getAddress(), 1000);
        await staking.connect(user).stake(500);
        expect(await x1coin.balanceOf(await staking.getAddress())).to.equal(500);
    });
});
