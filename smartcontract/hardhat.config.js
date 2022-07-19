require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
const dotenv = require("dotenv");
const { task } = require("hardhat/config");
dotenv.config();

task("accounts","Prints the list ",async(taskArgs,hre) =>{
  const accounts = await hre.ethers.getSigners();
  for(const account of accounts){
    console.log(account.address);
  }
});
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    matic:{
      url:"https://rpc-mumbai.maticvigil.com",
      accounts:[process.env.PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY
  },
 
};
