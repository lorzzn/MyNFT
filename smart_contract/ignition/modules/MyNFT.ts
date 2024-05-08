import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const myNFTModule = buildModule("myNFTModule", (m) => {
  const myNFT = m.contract("MyNFT");

  return { myNFT };
});

export default myNFTModule;
