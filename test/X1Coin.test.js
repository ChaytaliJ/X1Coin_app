const { expect } = require("chai");
const { ethers } = require("hardhat"); // Import ethers from Hardhat

describe("X1Coin", function () {
    let X1Coin, x1coin, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners(); // Correct usage

        X1Coin = await ethers.getContractFactory("X1Coin");
        x1coin = await X1Coin.deploy(owner.address, owner.address);
    });

    it("Should assign total supply to owner", async function () {
        const ownerBalance = await x1coin.balanceOf(owner.address);
        expect(await x1coin.totalSupply()).to.equal(ownerBalance);
    });
});
