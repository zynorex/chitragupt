import hre from "hardhat";

async function main() {
  const Chitragupt = await hre.ethers.getContractFactory("Chitragupt");
  const chitragupt = await Chitragupt.deploy();

  await chitragupt.waitForDeployment();

  console.log(`Chitragupt deployed to ${await chitragupt.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
