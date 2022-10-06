const { ethers } = require("hardhat");

async function main() {
    const BToken = await ethers.getContractFactory("Btoken");

    const btoken = await BToken.deploy();

    console.log("Contract deployed at", btoken.address);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
     .then(() =>process.exit(0))
     .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  