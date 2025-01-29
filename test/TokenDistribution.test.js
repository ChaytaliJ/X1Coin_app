const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("X1Coin Token Distribution", function () {
    let X1Coin, x1coin, owner, team, community, publicSale;

    beforeEach(async function () {
        try {
            [owner, team, community, publicSale] = await ethers.getSigners();

            X1Coin = await ethers.getContractFactory("X1Coin");
            x1coin = await X1Coin.deploy(await team.getAddress(), await community.getAddress());
            await x1coin.waitForDeployment(); // ✅ Correct deployment handling
        } catch (error) {
            console.error("Error in beforeEach hook:", error);
            throw error;
        }
    });

    it("Should allocate correct initial balances", async function () {
        expect(await x1coin.balanceOf(await publicSale.getAddress())).to.equal(0);
        expect(await x1coin.balanceOf(team.address)).to.equal(BigInt(300_000_000) * BigInt(10) ** BigInt(18));
        expect(await x1coin.balanceOf(community.address)).to.equal(BigInt(200_000_000) * BigInt(10) ** BigInt(18));

    });
});
