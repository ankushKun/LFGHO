import React from "react";
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useContractRead } from "wagmi";

export default function Title() {
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <div>
     <div>

     </div>
     <div>

     </div>
    </div>
  );
}
