require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL, // Sepolia Testnet RPC URL
      accounts: [process.env.PRIVATE_KEY] // Your Metamask Private Key
    }
  }
};
