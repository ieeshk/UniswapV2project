async function main() {
    const TestUniswapLiquidity = await ethers.getContractFactory("TestUniswapLiquidity");
    const testUniswapLiquidity = await TestUniswapLiquidity.deploy();
  
    console.log("Custom Token Uniswap deployed at: ", testUniswapLiquidity.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });