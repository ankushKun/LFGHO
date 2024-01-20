import React from "react";
import lfgho from "../../../contracts/artifacts/contracts/lfgho.sol/lfgho.json";
import {ethers} from "ethers";
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useContractRead, useContractWrite } from "wagmi";

export default function Input() {
  const { address, isConnecting, isDisconnected } = useAccount();

  // const { data, isLoading, isSuccess, write }  = useContractWrite({
  //   address: "0x5f6734B2ee6cF2bBf05AAF7aBf03ddCEBE439049",
  //   abi: lfgho.abi,
  //   functionName: "mint",
  // });

  const connectionAllowingIssuer=async()=>{
    const provider = new ethers.BrowserProvider((window as any).ethereum);
        await (window as any).ethereum.request({ method: "eth_requestAccounts" });
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(certificateAddress, lfgho.abi, signer);
        const transaction = await contract.allowingIssuer(_issuerAddress,_organisationName,_companyRegisteredNumber);
        transaction.wait();
   }
  

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
