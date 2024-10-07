import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { color } from "framer-motion";
type Props = {};

const ConnectWallet = (props: Props) => {
  return (
      <WalletMultiButton style={{color:"black",background:"orange",}} />
  );
};

export default ConnectWallet;
