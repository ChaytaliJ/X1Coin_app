const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const X1Coin = await hre.ethers.getContractFactory("X1Coin");
    const x1coin = await X1Coin.deploy(deployer.address, deployer.address);
    await x1coin.waitForDeployment();
    console.log("X1Coin deployed to:", await x1coin.getAddress());

    const Staking = await hre.ethers.getContractFactory("Staking");
    const staking = await Staking.deploy(await x1coin.getAddress());
    await staking.waitForDeployment();
    console.log("Staking Contract deployed to:", await staking.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
