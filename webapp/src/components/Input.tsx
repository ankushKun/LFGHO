import React from "react";
import lfgho from "../../../contracts/artifacts/contracts/lfgho.sol/lfgho.json";
import Ripples from "react-ripples";
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import { useAccount } from "wagmi";
import { createWalletClient, custom, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { useContractWrite } from "wagmi";

export default function Input() {
  const [otherPeopleAddress1, setOtherPeopleAddress1] = useState("");
  const [otherPeopleAddress2, setOtherPeopleAddress2] = useState("");
  const [balanceOfAddress, setBalanceOfAddress] = useState(0);
  const [getAllVouch, setgetAllVouch] = useState(["0x000001"]);
  const [getDetails, setgetDetails] = useState({
    bucketCapacity: 1,
    bucketLevel: 0,
    label: "",
    count: 2,
    value: 3,
    addrs: "0x000000",
  });

  const {
    address,
    isConnecting,
    isDisconnected,
  }: { address: string; isConnecting: boolean; isDisconnected: boolean } =
    useAccount();

  ///////////////////////////////////////////////////////////////////////////////

  // A Wallet Client is an interface to interact with Ethereum Account(s) and
  // provides the ability to retrieve accounts, execute transactions, sign messages, etc through Wallet Actions.

  const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom((window as any).ethereum),
  });

  ////////////////////////////////////////////////////////////////////////////////////

  // A Public Client is an interface to "public" JSON-RPC API methods such as
  // retrieving block numbers, transactions, reading from smart contracts, etc through Public Actions.

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  /////////////////////////////////////////////////////////////////////////////////////

  // getting input from html <input>

  const getInput = (event: any): void => {
    const name: string = event.target.name;
    const value: string = event.target.value;
    console.log(name, value);
    if (name === "address1") setOtherPeopleAddress1(value);
    if (name === "address2") setOtherPeopleAddress2(value);
  };
  //////////////////////////////////////////////////////////////////////////////////////

  // All these function are modifies the state of the blockchain
  // Basically write function

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
      args: [otherPeopleAddress1],
      account: address,
      chain: sepolia,
    });
    setOtherPeopleAddress1("");
  }

  ////////////////////////////////////////////////////////////////////////////////////

  // Getting the token the DAO member have with them
  // If someone is DAO member than the balanceOf will always be 1
  //This code output or any button of this function will not get shown to user

  async function balanceOf(): Promise<any> {
    await publicClient.readContract({
      address: "0x5f6734B2ee6cF2bBf05AAF7aBf03ddCEBE439049",
      abi: lfgho.abi,
      functionName: "balanceOf",
      args: [address],
      account: address,
    });
  }
  //////////////////////////////////////////////////////////////////////////////////

  // All these function reading from smart contract

  // getAllVouch will return ====>  string[]
  // getDetails will return ====> {bucketCapacity : number, bucketLevel : number, label : string, count : number, value : number, addrs : string}
  async function vouchDetails(): Promise<any> {
    const value1 = await publicClient.readContract({
      address: "0x5f6734B2ee6cF2bBf05AAF7aBf03ddCEBE439049",
      abi: lfgho.abi,
      functionName: "getAllVouch",
      args: [otherPeopleAddress2],
      account: address,
    });
    const value2 = await publicClient.readContract({
      address: "0x5f6734B2ee6cF2bBf05AAF7aBf03ddCEBE439049",
      abi: lfgho.abi,
      functionName: "getDetails",
      args: [otherPeopleAddress2],
      account: address,
    });
    console.log("Value11111111111 : " + value1);
    console.log("Value22222222222 : " + value2);
    setgetAllVouch(value1);
    setgetDetails(value2);
    setOtherPeopleAddress2("");
  }

  // async function getDetails(): Promise<any> {
  //   await publicClient.readContract({
  //     address: "0x5f6734B2ee6cF2bBf05AAF7aBf03ddCEBE439049",
  //     abi: lfgho.abi,
  //     functionName: "getDetails",
  //     args: [otherPeopleAddress2],
  //     account: address,
  //   });
  //   setOtherPeopleAddress2("");
  // }

  //////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="w-full bg-orange-400 flex flex-row">
      <div className="w-2/4 flex flex-col border-box p-10 gap-20 border-solid border-black border-4">
        <div className="">
          {balanceOfAddress === 1 ? (
            <div>
              <h1 className="">Revoke as DAO Member</h1>{" "}
              <button onClick={() => burn()}>Burn</button>
            </div>
          ) : (
            <div className="bg-red-800 flex flex-row gap-12">
              <h1 className="text-4xl">Want to Become DAO Member</h1>{" "}
              {/*text-5xl*/}
              <Ripples
                color="black"
                during={1200}
                placeholder={"Random Anything"}
              >
                <button
                  className="w-44 text-3xl border-solid border-black border-4 rounded-lg shadow-[-3px_3px_1px_black] "
                  onClick={() => mint()}
                >
                  Mint
                </button>{" "}
              </Ripples>
              {/*w-44 text-3xl*/}
            </div>
          )}
        </div>

        <div className="bg-red-800 flex flex-col gap-10">
          <h1 className="text-4xl">
            Do you wanna vouch for anyone? Vouch here{" "}
          </h1>
          <div className="flex flex-row justify-center gap-10 ">
            <input
              className="w-2/4 border-solid border-black border-4 bg-slate-600 rounded-md text-3xl"
              type="text"
              autoComplete="off"
              value={otherPeopleAddress1}
              onChange={getInput}
              name="address1"
              id="address1"
              placeholder="Address"
            ></input>{" "}
            <Ripples
              color="black"
              during={1200}
              placeholder={"Random Anything"}
            >
              <button
                className="w-44 text-3xl border-solid border-black border-4 rounded-lg shadow-[-3px_3px_1px_black]"
                onClick={() => vouch()}
              >
                Vouch
              </button>
            </Ripples>
          </div>
        </div>
        <div className="bg-red-800 flex flex-col gap-10">
          <h1 className="text-4xl">Check the Vouches for any address</h1>
          <div className="flex flex-row justify-center pl-4 gap-10 ">
            <input
              className="w-2/4 border-solid border-black border-4 bg-slate-600 rounded-md text-3xl"
              type="text"
              autoComplete="off"
              value={otherPeopleAddress2}
              onChange={getInput}
              name="address2"
              id="address2"
              placeholder="Address"
            ></input>{" "}
            <Ripples
              color="black"
              during={1200}
              placeholder={"Random Anything"}
            >
              <button
                className="w-64 text-3xl border-solid border-black border-4 rounded-lg shadow-[-3px_3px_1px_black] "
                onClick={() => vouchDetails()}
              >
                Check Vouches
              </button>
            </Ripples>
          </div>
        </div>
      </div>
      <div className="w-2/4 border-solid border-black border-4">
        <div>
          <h1>count : {getDetails.count}</h1>
          <h1>Value : {getDetails.value}</h1>
        </div>
        <div>
          {getAllVouch.map((value, key) => {
            return (
              <div>
                <h1>address : {value}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
