// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
const args = require('./arguments');

async function main() {
  const name = args[0] || "TmpName";
  const symbol = args[1] || "TMP";
  const baseUri = args[2] || "BaseUri";
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const NftMint = await ethers.getContractFactory("NftMint");
  const nftMint = await NftMint.deploy(name, symbol, baseUri);

  await nftMint.deployed();

  console.log("NftMint deployed to:", nftMint.address);
  console.log("NftMint's owner is:", await nftMint.owner());

  console.log("npx hardhat verify --network rinkeby --constructor-args arguments.js " + nftMint.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
