const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Uniswap', () => {
  let AToken;
  let aToken;
  let BToken;
  let bToken;
  let Uniswap;
  let uniswap;
  let addr1;
  let addr2;
  let owner;
  const zeroAddress = "0x0000000000000000000000000000000000000000";


  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    AToken = await ethers.getContractFactory('Atoken');
    aToken = await AToken.deploy();
    await aToken.deployed();
    aTokenAddress = aToken.address;
    //console.log("a token address is",aTokenAddress);

    BToken = await ethers.getContractFactory('Btoken');
    bToken = await BToken.deploy();
    await bToken.deployed();
    bTokenAddress = bToken.address;
    //console.log("b token is deployed at", bTokenAddress);

    // Uniswap
    Uniswap = await ethers.getContractFactory('TestUniswapLiquidity');
    uniswap = await Uniswap.deploy();
    await uniswap.deployed();
    uniswapAddress = uniswap.address;
  });

  it('Should mint the token ', async () => {
    await aToken.mint(addr1.address, 10000000000);
    expect(await aToken.balanceOf(addr1.address)).to.equal(
      ethers.utils.parseUnits('10000000000', 18)
    );
  });

  it('Should approve the uniswap contract', async () => {
    await aToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('10000000000', 18));
  });

  it('Should transfer the token to uniswap contract', async () => {
    await aToken.mint(addr1.address, 10000000000);
    await aToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('10000000000', 18));
    await aToken
      .connect(addr1)
      .transfer(uniswapAddress, ethers.utils.parseUnits('10000000000', 18));
  });

  it('Should add liquidity Atoken with ETH', async function () {
    await aToken.mint(addr1.address, 10000000000);
    await aToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('10000000000', 18));
    await uniswap
      .connect(addr1)
      .addLiquidityEth(aTokenAddress, ethers.utils.parseUnits('10000000000', 18), {
        value: ethers.utils.parseEther('2'),
      });
      
  });

  it('Should add liquidity with valid address with ETH ', async function () {
    await expect(uniswap
      .connect(addr1)
      .addLiquidityEth(zeroAddress, ethers.utils.parseUnits('10000000000', 18), {
        value: ethers.utils.parseEther('2'),
      })).to.be.revertedWith(
        "Not a valid address"
      );
      
  });

  it('Should add liquidity Atoken with ETH with positive valid amount', async function () {

    await expect(uniswap
      .connect(addr1)
      .addLiquidityEth(aTokenAddress, 0, {
        value: ethers.utils.parseEther('2'),
      })).to.be.revertedWith(
        "Enter a positive token Amount"
    );
      
  });

  it('Should remove liquidity with valid address with ETH', async function () {
    
    await expect(uniswap
      .connect(addr1)
      .removeLiquidityETH(zeroAddress)).to.be.revertedWith(
        "Not a valid token Address"
      );  
  });

  it('Should remove liquidity Atoken with ETH', async function () {
    await aToken.mint(addr1.address, 10000000000);
    await aToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('10000000000', 18));  
    await uniswap
      .connect(addr1)
      .addLiquidityEth(aTokenAddress, ethers.utils.parseUnits('10000000000', 18), {
        value: ethers.utils.parseEther('2'),
      });
    await uniswap
      .connect(addr1)
      .removeLiquidityETH(aTokenAddress);  
  });

  it('Should add liquidity Atoken with Btoken', async function () {
    await aToken.mint(addr1.address, 10000000000);
    await bToken.mint(addr1.address, 40000000000);
    await aToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('10000000000', 18));
    await bToken
       .connect(addr1)
       .approve(uniswapAddress, ethers.utils.parseUnits('40000000000', 18));  
    await uniswap
      .connect(addr1)
      .addLiquidity(aTokenAddress, bTokenAddress
        ,ethers.utils.parseUnits('10000000000', 18), ethers.utils.parseUnits('40000000000', 18)
      );
  });

  it('Should add liquidity with valid address only with Btoken', async function () {
    
    await expect(uniswap
      .connect(addr1)
      .addLiquidity(zeroAddress, bTokenAddress
        ,ethers.utils.parseUnits('10000000000', 18), ethers.utils.parseUnits('40000000000', 18)
      )).to.be.revertedWith(
        "Not a valid token address");
  });

  it('Should add liquidity with Atoken with valid Address only', async function () {
     
    await expect(uniswap
      .connect(addr1)
      .addLiquidity(aTokenAddress, zeroAddress
        ,ethers.utils.parseUnits('10000000000', 18), ethers.utils.parseUnits('40000000000', 18)
      )).to.be.revertedWith(
        "Not a valid token address");
  });

  it('Should add liquidity with Atoken with B token with postive Atoken Amount', async function () {
     
    await expect(uniswap
      .connect(addr1)
      .addLiquidity(aTokenAddress, bTokenAddress
        ,0, ethers.utils.parseUnits('40000000000', 18)
      )).to.be.revertedWith(
        "Enter a positive token amount");
  });

  it('Should add liquidity with Atoken with B token with postive Btoken Amount', async function () {
     
    await expect(uniswap
      .connect(addr1)
      .addLiquidity(aTokenAddress, bTokenAddress
        ,ethers.utils.parseUnits('10000000000', 18), 0
      )).to.be.revertedWith(
        "Enter a positive token amount");
  });

  it('Should remove liquidity Atoken with Btoken', async function () {
    await aToken.mint(addr1.address, 10000000000);
    await bToken.mint(addr1.address, 40000000000);
    await aToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('10000000000', 18));
    await bToken
       .connect(addr1)
       .approve(uniswapAddress, ethers.utils.parseUnits('40000000000', 18));  
    await uniswap
      .connect(addr1)
      .addLiquidity(aTokenAddress, bTokenAddress
        ,ethers.utils.parseUnits('10000000000', 18), ethers.utils.parseUnits('40000000000', 18)
      );
    await uniswap
       .connect(addr1)
       .removeLiquidity(aTokenAddress, bTokenAddress);
  });

  it('Should remove liquidity with valid token address with Btoken', async function () {
     
    await expect(uniswap
       .connect(addr1)
       .removeLiquidity(zeroAddress, bTokenAddress)).to.be.revertedWith(
        "Not a valid token Address"
       );
  });

  it('Should remove liquidity with Atoken address with valid address only', async function () {
     
    await expect(uniswap
       .connect(addr1)
       .removeLiquidity(aTokenAddress, zeroAddress)).to.be.revertedWith(
        "Not a valid token Address"
       );
  });


  it('Should swap token for ETH ', async () => {
    await aToken.mint(addr1.address, 100000000000000);
    await aToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('100000000000000', 18));
    await uniswap
      .connect(addr1)
      .addLiquidityEth(aTokenAddress, ethers.utils.parseUnits('10000000000', 18), {
        value: ethers.utils.parseEther('2'),
      });
    await uniswap
      .connect(addr1)
      .swapTokenforETH(aTokenAddress ,ethers.utils.parseUnits('1000', 18), 1);
  });

  it('Should swap valid token for ETH only ', async () => {
    
    await expect(uniswap
      .connect(addr1)
      .swapTokenforETH(zeroAddress ,ethers.utils.parseUnits('1000', 18), 1))
      .to.be.revertedWith(
    "Enter a valid token Address");
   });
   
   it('Should swap atoken for ETH with valid amount ', async () => {
    
    await expect(uniswap
      .connect(addr1)
      .swapTokenforETH(aTokenAddress ,0, 1))
      .to.be.revertedWith(
    "Enter a positive token Amount");
    });



  it('Should swap ETH for Token', async () => {
    await aToken.mint(addr1.address, 100000000000000);
    await aToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('100000000000000', 18));
    await uniswap
      .connect(addr1)
      .addLiquidityEth(aTokenAddress, ethers.utils.parseUnits('10000000000', 18), {
        value: ethers.utils.parseEther('2'),
      });
    
      const ethToSwap = ethers.utils.parseEther("0.5");
      
      const balanceBeforeSwap = await ethers.provider.getBalance(addr1.address);
      console.log("balance before swap", balanceBeforeSwap);
      
      await uniswap
            .connect(addr1)
            .swapexactETHforToken(aTokenAddress, 1, {value: ethers.utils.parseEther("0.5"),});
      
      const balanceAfterSwap  = await ethers.provider.getBalance(addr1.address);
      console.log("balance after swap", balanceAfterSwap);
       
  });

  it('Should swap ETH for Token', async () => {
    
    await expect(uniswap
        .connect(addr1)
        .swapexactETHforToken(zeroAddress, 1, {value: ethers.utils.parseEther("0.5"),}))
        .to.be.revertedWith("Enter a valid token Address");
  });

  it('Should swap token to token', async function () {
    await aToken.mint(addr1.address, 20000000000);
    await bToken.mint(addr1.address, 40000000000);
    await aToken
      .connect(addr1)
      .approve(uniswapAddress, ethers.utils.parseUnits('20000000000', 18));
    await bToken
       .connect(addr1)
       .approve(uniswapAddress, ethers.utils.parseUnits('40000000000', 18));  
    await uniswap
      .connect(addr1)
      .addLiquidity(aTokenAddress, bTokenAddress
        ,ethers.utils.parseUnits('10000000000', 18), ethers.utils.parseUnits('40000000000', 18)
      );
    await uniswap
       .connect(addr1)
       .swapTokentoToken(
        aTokenAddress,
        bTokenAddress,
        ethers.utils.parseUnits('10000000000', 18),
        1
       ); 
  });

  it('Should swap valid token only to Btoken', async function () {
    
    await expect(uniswap
       .connect(addr1)
       .swapTokentoToken(
        zeroAddress,
        bTokenAddress,
        ethers.utils.parseUnits('10000000000', 18),
        1
       ))
       .to.be.revertedWith(
        "Enter a valid token Address"
       ); 
  });

  it('Should swap Atoken to valid token only', async function () {
    
    await expect(uniswap
       .connect(addr1)
       .swapTokentoToken(
        aTokenAddress,
        zeroAddress,
        ethers.utils.parseUnits('10000000000', 18),
        1
       ))
       .to.be.revertedWith(
        "Enter a valid token Address"
       ); 
  });

  it('Should swap Atoken to Btoken with valid Atoken swap amount', async function () {
    
    await expect(uniswap
       .connect(addr1)
       .swapTokentoToken(
        aTokenAddress,
        bTokenAddress,
        0,
        1
       ))
       .to.be.revertedWith(
        "Enter a positive token amount"
       ); 
  });
});
