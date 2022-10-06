require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");

module.exports = {
  networks: {
    hardhat: {
      forking: {
        url:"https://eth-mainnet.g.alchemy.com/v2/a3rOPUYdhru-d2_S_dPrR_0P49Oo3ejs",
      },
    },
    // bscTestnet: {
    //   url: "https://eth-goerli.g.alchemy.com/v2/tD0SU1xcediqc0M1tdxguEzpW9WrB9ZP",
    //   chainId: 5,
    //   gasPrice: 20000000000,
    //   accounts: [""]
    // },
  },
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts/",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
  etherscan: {
    apiKey: {
      //goerli: "5C38XQQAVKVS3IV4PXGWD7IWE6792I4XMF",
    },
  },
};