const hre = require("hardhat");

async function main() {
    // Get the contract factory
    const CharityDonation = await hre.ethers.getContractFactory("CharityDonation");

    // Deploy the contract
    const charity = await CharityDonation.deploy();

    // Wait for deployment to complete
    await charity.waitForDeployment();

    // Log the deployed contract address
    console.log("✅ CharityDonation contract deployed to:", await charity.getAddress());
}

// Run the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
