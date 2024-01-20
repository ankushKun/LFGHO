import React from "react";
import lfgho from "../../../contracts/artifacts/contracts/lfgho.sol/lfgho.json";
import fs from "fs";
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useContractRead,useContractWrite } from "wagmi";

export default function Input() {
  // const addrsJson:any = fs.readFileSync("../../../contracts/smartContractAddress.json");
  // const addrs = JSON.parse(addrsJson);
  // console.log(addrs);
 
  // interface ContractWrite {
  //   address: string,
  //   abi?: any,
  //   functionName:string,
  // }

  console.log(lfgho.abi);

  const { address, isConnecting, isDisconnected } = useAccount();


  const x  = useContractWrite({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: lfgho.abi,
    functionName: 'feed',
  })

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
