import React from "react";
import { VerifyBlock } from "../components/Verify";
import { WalletAuthBlock } from "../components/WalletAuthBlock";

const HomePage = () => {
  return (
    <div>
      <div style={{ transform: "translate(18%, 250%)" }}>
        <VerifyBlock />
      </div>
      <div style={{ transform: "translate(0%, -5%)" }}>
      <WalletAuthBlock />
      </div>
    </div>
  );
};

export default HomePage;
