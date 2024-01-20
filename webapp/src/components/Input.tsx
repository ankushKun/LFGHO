import React from "react";
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useContractRead,useContractWrite } from "wagmi";

export default function Input() {
  const { address, isConnecting, isDisconnected } = useAccount();
  

  return (
    <div>
        <div>
            <h1>Want to Become DAO Member</h1> <button>Mint</button>
        </div>
        <div>
            <h1>Do you wanna vouch for anyone? DO here </h1>
            <input className="bg-slate-600"></input> <button>Vouch</button>
        </div>
        <div>
            <h1>Check the Vouches for any address</h1>
            <input className="bg-slate-600"></input> <button>Vouch</button>
        </div>
    </div>
  );
}
