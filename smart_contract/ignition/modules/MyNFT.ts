import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MyNFTModule = buildModule("MyNFTModule", (m) => {
  const MyNFT = m.contract("MyNFT");

  return { MyNFT };
});

export default MyNFTModule;
