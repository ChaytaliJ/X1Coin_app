# X1Coin Smart Contracts - README

## Project Overview

This project contains the smart contracts for **X1Coin** and its **Staking** functionality. It includes the necessary scripts to deploy, test, and verify the contracts on the Ethereum network using **Hardhat**. The project is configured to deploy to the **Sepolia** test network and has the option to verify contracts on **Etherscan**.

---

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download and install [Node.js](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **Metamask** (for interacting with the Ethereum network and handling your wallet)
4. **An Ethereum wallet** with testnet Ether for deployment (using faucets like [Sepolia Faucet](https://sepoliafaucet.com/))

---

## Step 1: Clone the Repository
Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/x1Coin_app.git
cd X1Coin_app/x1coin-project 
```

---
## Step 2: Install the dependencies
```bash
npm install
```

## Step 3: Create .env file:
The project requires sensitive API keys for interacting with external services (Alchemy, Etherscan). To keep these values secure, you need to create a .env file in the root of the project.

Create a **.env** file in the root directory of your project.

Add the following content to the **.env** file, replacing the placeholders with your actual values:

```bash
ALCHEMY_API_KEY="YOUR_ALCHEMY_API_KEY"
PRIVATE_KEY="YOUR_PRIVATE_KEY"
ETHERSCAN_API_KEY="YOUR_ETHERSCAN_API_KEY"

```


## Step 4: Configure Hardhat:
```js

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables

module.exports = {
    solidity: "0.8.20",
    networks: {
        hardhat: {},
        sepolia: {
            url: process.env.ALCHEMY_API_KEY,
            accounts: [process.env.PRIVATE_KEY]
        }
    },
    etherscan: {
        apiKey: {
            sepolia: process.env.ETHERSCAN_API_KEY  
        }
    }
};

```
## Step 5: Compile the Contracts:
```bash
npx hardhat compile
```
## Step 6: Deploy the Contracts:
To compile the Solidity contracts (Staking.sol, X1Coin.sol)

```bash
npx hardhat run scripts/deploy.js --network sepolia

```
## Step 7: Verify Contracts on Etherscan:
```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```
## Step 8: Run Tests
This project includes unit tests for the contracts (Staking.test.js, X1Coin.test.js, TokenDistribution.test.js)
```bash
npx hardhat test
```
This will run all the test scripts and provide feedback on your contracts' functionality.

## Step 9: Interact with the Contracts
After deploying the contracts, you can interact with them:
**Using Hardhat Console**
Start the Hardhat console to interact with your contracts programmatically:
```bash
npx hardhat console --network sepolia
```
