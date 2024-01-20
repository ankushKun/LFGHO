import React from "react";
import lfgho from "../../../contracts/artifacts/contracts/lfgho.sol/lfgho.json";
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import { useAccount } from "wagmi";
import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";
import { useContractWrite } from "wagmi";

export default function Input() {
  const [otherPeopleAddress, setOtherPeopleAddress] = useState("");

  const {
    address,
    isConnecting,
    isDisconnected,
  }: { address: string; isConnecting: boolean; isDisconnected: boolean } =
    useAccount();

  const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom((window as any).ethereum),
  });

  const getInput = (event: any): void => {
    const name: string = event.target.name;
    const value: string = event.target.value;
    console.log(name, value);
    setOtherPeopleAddress(value);
  };

  async function mint(): Promise<any> {
    // const un = await walletClient.getAddresses();
    // console.log(typeof(un[0]));
    await walletClient.writeContract({
      address: "0x5f6734B2ee6cF2bBf05AAF7aBf03ddCEBE439049",
      abi: lfgho.abi,
      functionName: "mint",
      args: [address, 1],
      account: address,
      chain: sepolia,
    });
  }

  async function burn(): Promise<any> {
    // const un = await walletClient.getAddresses();
    // console.log(typeof(un[0]));
    await walletClient.writeContract({
      address: "0x5f6734B2ee6cF2bBf05AAF7aBf03ddCEBE439049",
      abi: lfgho.abi,
      functionName: "burn",
      args: [1],
      account: address,
      chain: sepolia,
    });
  }

  async function vouch(): Promise<any> {
    // const un = await walletClient.getAddresses();
    // console.log(typeof(un[0]));
    await walletClient.writeContract({
      address: "0x5f6734B2ee6cF2bBf05AAF7aBf03ddCEBE439049",
      abi: lfgho.abi,
      functionName: "vouch",
      args: [otherPeopleAddress],
      account: address,
      chain: sepolia,
    });
  }

  return (
    <div>
      <div>
        <h1>Want to Become DAO Member</h1>{" "}
        <button onClick={() => mint()}>Mint</button>
      </div>
      <div>
        <h1>Revoke as DAO Member</h1>{" "}
        <button onClick={() => burn()}>Burn</button>
      </div>
      <div>
        <h1>Do you wanna vouch for anyone? DO here </h1>
        <input
          className="bg-slate-600"
          type="text"
          autoComplete="off"
          value={otherPeopleAddress}
          onChange={getInput}
          name="address"
          id="address"
          placeholder="Address"
        ></input>{" "}
        <button onClick={() => vouch()}>Vouch</button>
      </div>
      <div>
        <h1>Check the Vouches for any address</h1>
        <input className="bg-slate-600"></input> <button>Vouch</button>
      </div>
    </div>
  );
}
