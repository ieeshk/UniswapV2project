const { ethers } = require('ethers');
const Web3 = require("web3");
//const axios = require("axios");
//require('dotenv').config()

var web3 = new Web3(hre.network.provider);

const FACTORY_ADDRESS = "0xf1215b0dCc50DE9Dc61407A5d3d585d1886f0850";
 const RPC_PROVIDER = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL_BSCTESTNET)
 const WALLET_ADDRESS = process.env.WALLET_ADDRESS
 const WALLET_KEY = process.env.WALLET_KEY

//Add the address of tokens for which you want to create pair
const cToken = "0x3e6e77EB06D2cdFE42Ad2A54a784d4E324b3923C";
const dToken = "0xB593f0E4589F8E6f350441b18B9AE6652B32EaB3";

 const wallet = new ethers.Wallet(WALLET_KEY)
 const connectedWallet = wallet.connect(RPC_PROVIDER)

async function main() {
    var factoryInstance = new web3.eth.Contract(abi.abi, FACTORY_ADDRESS);

    //create pair

    const tx = await factoryInstance.createPair.connect(WALLET_ADDRESS)(
        cToken,
        dToken
    )

    const receipt = await tx.wait()
    console.log('receipt is', receipt)

    const newPoolAddress = await factoryInstance.getPair(
        cToken,
        dToken
    )

    console.log("The pool Address is", newPoolAddress)


}