const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lfghoContractFactory = await hre.ethers.getContractFactory("lfgho");
  const lfghoContract = await lfghoContractFactory.deploy();

  // await counterContract.deployed();

  try {
    fs.writeFileSync(
      "./smartContractAddress.json",
      JSON.stringify({ smartContractAddress: lfghoContract.target })
    );
  } catch (error) {
    console.error(error);

    throw error;
  }

  console.log(
    `Contract :  timestamp ${unlockTime} deployed to ${lfghoContract.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
