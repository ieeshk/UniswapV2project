const { ethers } = require("hardhat");

async function main() {
    const EToken = await ethers.getContractFactory("Etoken");

    const etoken = await EToken.deploy();

    console.log("Contract deployed at", etoken.address);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
     .then(() =>process.exit(0))
     .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  