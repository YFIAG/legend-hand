
const hre = require("hardhat");
const abi = require("../abi/yfiag.abi.json")
async function main() {
  

  const accounts = await hre.ethers.getSigners()
  // const Yfiag = await ethers.getContractFactory("YfiagERC20");
  // const yfiag = await ethers.getContractFactory("YfiagERC20");
  const yfiag = new ethers.Contract('0x71f4A5202A09DA255558F3Fb6D05C8FD24d10a2e', abi, accounts[0]);
  // const yfiag = await Yfiag.deploy();
  // await yfiag.deployed();
  console.log("YfiagERC20 deployed to:", yfiag.address);
  const DiamondHand = await hre.ethers.getContractFactory("DiamondHand");
  const master = await DiamondHand.deploy(yfiag.address,"0xAb7D9763ee384C428e752c6A113c520061baD963");

  await master.deployed();

  console.log("DiamondHand deployed to:", master.address);
  let treasury = await yfiag.balanceOf("0xAb7D9763ee384C428e752c6A113c520061baD963");
  console.log("treasury balance :", treasury.toString());
  await yfiag.approve(master.address,treasury);


  let approval = await yfiag.allowance("0xAb7D9763ee384C428e752c6A113c520061baD963",master.address);
  console.log("approval balance :", approval.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
