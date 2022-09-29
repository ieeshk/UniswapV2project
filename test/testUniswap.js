const Web3 = require("web3");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre  = require("hardhat");

var web3 = new Web3(hre.network.provider);

const ROUTER_ADDRESS = "0x5510E03Da1E6CdE8aB0c0B35cF217AdCaa7f19B2";
const FACTORY_ADDRESS = "0xf1215b0dCc50DE9Dc61407A5d3d585d1886f0850";

let deployer;
let user2;

async function getAddresses() {
    const accounts = await hre.ethers.getSigners();
    deployer = accounts[0];
    user2 = accounts[1];
}
async function Testing {
    const TestUniswap = await hre.ethers.getContractFactory("testUniswap");
    const testUniswap = await TestUniswap.deploy();
    await testUniswap.deployed();

    const abi = await hre.artifacts.readArtifact("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20");

    //const ethToken = "";
    const aToken = "0xF7e98F62886872929601381EAB1Fb7bcC277456D";
    const bToken = "0x56ab9F60cD900b8548D44924F09d605A522b4368";
    const cToken = "0x3e6e77EB06D2cdFE42Ad2A54a784d4E324b3923C";
    const dToken = "0xB593f0E4589F8E6f350441b18B9AE6652B32EaB3";
    const eToken = "0xd9F0cf8b44364CbA2c21ce89e0b79893DB113875";
    const zeroAddress = "0x0000000000000000000000000000000000000000";

    var aTokenInstance = new web3.eth.Contract(abi.abi, aToken);
    var bTokenInstance = new web3.eth.Contract(abi.abi, bToken);
    var cTokenInstance = new web3.eth.Contract(abi.abi, cToken);
    var dTokenInstance = new web3.eth.Contract(abi.abi, dToken);
    var eTokenInstance = new web3.eth.Contract(abi.abi, eToken);

    

}
