import React from "react";
import lfgho from "../../../contracts/artifacts/contracts/lfgho.sol/lfgho.json";
import Ripples from "react-ripples";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { createWalletClient, custom, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const contractAdds: `0x${string}` =
  "0x000E65B85A0f89f1006bC5202ecBE70D249698Ad";

export default function Input() {
  const [otherPeopleAddress1, setOtherPeopleAddress1] = useState("");
  const [otherPeopleAddress2, setOtherPeopleAddress2] = useState("");
  const [balanceOfAddress, setBalanceOfAddress] = useState(0);
  const [getAllVouch, setgetAllVouch] = useState<string[]>([

  ]);
  const [getDetails, setgetDetails] = useState({
    bucketCapacity: 0,
    bucketLevel: 0,
    label: "",
    count: 0,
    value: 0,
    addrs: "",
  });
  const [updater, setUpdater] = useState<NodeJS.Timeout>();

  const {
    address,
  }: // isConnecting,
    // isDisconnected,
    { address: string; isConnecting: boolean; isDisconnected: boolean } =
    useAccount();

  useEffect(() => {
    setUpdater(setInterval(async () => {
      // console.log("Updating DAO");
      await balanceOf();
    }, 2000));

    return clearInterval(updater);
  }, []);

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
      address: (import.meta.env.VITE_CONTRACT as `0x${string}`) || contractAdds,
      abi: lfgho.abi,
      functionName: "mint",
      args: [address, 1],
      account: address as `0x${string}`,
      chain: sepolia,
    });
  }

  async function burn(): Promise<any> {
    // const un = await walletClient.getAddresses();
    // console.log(typeof(un[0]));
    await walletClient.writeContract({
      address: (import.meta.env.VITE_CONTRACT as `0x${string}`) || contractAdds,
      abi: lfgho.abi,
      functionName: "burn",
      args: [1],
      account: address as `0x${string}`,
      chain: sepolia,
    });
  }

  async function vouch(): Promise<any> {
    // const un = await walletClient.getAddresses();
    // console.log(typeof(un[0]));
    await walletClient.writeContract({
      address: (import.meta.env.VITE_CONTRACT as `0x${string}`) || contractAdds,
      abi: lfgho.abi,
      functionName: "vouch",
      args: [otherPeopleAddress1],
      account: address as `0x${string}`,
      chain: sepolia,
    });
    setOtherPeopleAddress1("");
  }

  ////////////////////////////////////////////////////////////////////////////////////

  // Getting the token the DAO member have with them
  // If someone is DAO member than the balanceOf will always be 1
  //This code output or any button of this function will not get shown to user

  async function balanceOf(): Promise<any> {
    const val = await publicClient.readContract({
      address: (import.meta.env.VITE_CONTRACT as `0x${string}`) || contractAdds,
      abi: lfgho.abi,
      functionName: "balanceOf",
      args: [address],
      account: address as `0x${string}`,
    });
    setBalanceOfAddress(Number(val));
  }
  // balanceOf();
  //////////////////////////////////////////////////////////////////////////////////

  // All these function reading from smart contract

  type Details = {
    bucketCapacity: number;
    bucketLevel: number;
    label: string;
    count: number;
    value: number;
    addrs: string;
  };

  // getAllVouch will return ====>  string[]
  // getDetails will return ====> {bucketCapacity : number, bucketLevel : number, label : string, count : number, value : number, addrs : string}
  async function vouchDetails(): Promise<any> {
    const value1 = (await publicClient.readContract({
      address: (import.meta.env.VITE_CONTRACT as `0x${string}`) || contractAdds,
      abi: lfgho.abi,
      functionName: "getAllVouch",
      args: [otherPeopleAddress2],
      account: address as `0x${string}`,
    })) as string[];
    const value2 = (await publicClient.readContract({
      address: (import.meta.env.VITE_CONTRACT as `0x${string}`) || contractAdds,
      abi: lfgho.abi,
      functionName: "getDetails",
      args: [otherPeopleAddress2],
      account: address as `0x${string}`,
    })) as Details;
    console.log("Value11111111111 : " + value1);

    const a: any = JSON.parse(
      JSON.stringify(value2, (key, value) => {
        return typeof value === "bigint" ? value.toString() : value;
      })
    );

    setgetAllVouch(value1);
    setgetDetails(a);
    console.log(getDetails);
    setOtherPeopleAddress2("");
  }

  // async function getDetails(): Promise<any> {
  //   await publicClient.readContract({
  //     address: import.meta.env.VITE_CONTRACT as `0x${string}` || contractAdds,
  //     abi: lfgho.abi,
  //     functionName: "getDetails",
  //     args: [otherPeopleAddress2],
  //     account: address as `0x${string}`,
  //   });
  //   setOtherPeopleAddress2("");
  // }

  //////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="w-full flex flex-row">
      <div className="w-2/4 flex flex-col border-box p-10 gap-20">
        <div className="">
          {balanceOfAddress === 1 ? (
            <div className=" flex flex-row gap-12">
              <h1 className="text-4xl font-medium	">Yahooo! You're a DAO member now</h1>{" "}
              <Ripples
                color="black"
                during={1200}
                placeholder={"Random Anything"}
              >
                <button
                  className="w-44 text-3xl font-medium border-solid border-black border-4 rounded-lg shadow-[-3px_3px_1px_black] "
                  onClick={() => burn()}
                >
                  Leave DAO
                </button>
              </Ripples>
            </div>
          ) : (
            <div className=" flex flex-row gap-12">
              <h1 className="text-4xl font-medium	">
                Want to Become DAO Member
              </h1>{" "}
              {/*text-5xl*/}
              <Ripples
                color="black"
                during={1200}
                placeholder={"Random Anything"}
              >
                <button
                  className="w-44 text-3xl font-medium border-solid border-black border-4 rounded-lg shadow-[-3px_3px_1px_black] "
                  onClick={() => mint()}
                >
                  Mint
                </button>{" "}
              </Ripples>
              {/*w-44 text-3xl*/}
            </div>
          )}
        </div>

        <div className=" flex flex-col gap-10">
          <h1 className="text-4xl font-medium	">
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
                className="w-44 text-3xl font-medium border-solid border-black border-4 rounded-lg shadow-[-3px_3px_1px_black]"
                onClick={() => vouch()}
              >
                Vouch
              </button>
            </Ripples>
          </div>
        </div>
        <div className=" flex flex-col gap-10">
          <h1 className="text-4xl font-medium	">
            Check the Vouches for any address
          </h1>
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
                className="w-64 text-3xl font-medium   border-solid border-black border-4 rounded-lg shadow-[-3px_3px_1px_black] "
                onClick={() => vouchDetails()}
              >
                Check Vouches
              </button>
            </Ripples>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/4 flex flex-col bg-gray-200 rounded-lg p-4">
        <div className=" flex flex-col my-0 mx-auto py-5 gap-5">
          <h1 className="text-4xl md:text-6xl font-medium	mb-2">count : {getDetails.count}</h1>
          <h1 className="text-4xl md:text-6xl font-medium">Value : {getDetails.value}</h1>
        </div>
        <div className="flex flex-col items-center gap-6">
          {getAllVouch.length > 0 ? <div>
            Vouchers List:
            {getAllVouch.map((value, key) => {
              return (
                <div key={key}>
                  <h1 className="text-xl">{value}</h1>
                </div>
              );
            })}
          </div> : <div className="text-sm md:text-lg font-semibold">No Vouchers</div>}
        </div>
      </div>
    </div>
  );
}
