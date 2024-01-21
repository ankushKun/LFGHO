import React, { ButtonHTMLAttributes } from 'react';
import Ripples from "react-ripples";
import { createWalletClient, createPublicClient, custom } from "viem";
import { sepolia } from "viem/chains";
import abi from "./abi.json";


const btnStyle: React.CSSProperties = {
    padding: "10px",
    border: "3px solid #000",
    borderRadius: "5px",
    backgroundColor: "#f5f5f5",
    color: "#000",
    cursor: "pointer",
    fontSize: "16px",
    fontFamily: "Arial",
    fontWeight: "bold",
    boxShadow: "0px 0px 5px 0px #000000"
}

function useVouch(vouchFor: `0x${string}`, contract: `0x${string}` = "0x000E65B85A0f89f1006bC5202ecBE70D249698Ad") {

    const client = createWalletClient({
        chain: sepolia,
        transport: custom((window as any).ethereum)
    })
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: custom((window as any).ethereum)
    })

    const JoinDAOButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
        async function mint() {
            const [address] = await client.getAddresses()
            console.log(`Minting token to ${address}`);
            await client.writeContract({
                address: contract,
                abi,
                functionName: "mint",
                args: [address, 1],
                account: address,
                chain: sepolia,
            });
        }

        return <div style={{ padding: "5px" }}>
            <Ripples color="black" during={1200} placeholder="Join DAO">
                <button {...props} style={btnStyle} onClick={mint}>Join DAO</button>
            </Ripples>
        </div>
    }

    const ExitDAOButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
        async function burn() {
            const [address] = await client.getAddresses()
            console.log(`Burning token from ${address}`);
            await client.writeContract({
                address: contract,
                abi,
                functionName: "burn",
                args: [1],
                account: address,
                chain: sepolia,
            });
        }

        return <div style={{ padding: "5px" }}>
            <Ripples color="black" during={1200} placeholder="Join DAO">
                <button {...props} style={btnStyle} onClick={burn}>Exit DAO</button>
            </Ripples>
        </div>
    }

    const VouchButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
        async function vouch() {
            const [address] = await client.getAddresses()
            console.log(`Vouching ${vouchFor}`);
            await client.writeContract({
                address: contract,
                abi,
                functionName: "vouch",
                args: [vouchFor],
                account: address,
                chain: sepolia,
            });
        }

        return <div style={{ padding: "5px" }}>
            <Ripples color="black" during={1200} placeholder="Join DAO">
                <button {...props} style={btnStyle} onClick={vouch}>Vouch {vouchFor.slice(0, 5)}...{vouchFor.slice(vouchFor.length - 5, vouchFor.length - 1)}</button>
            </Ripples>
        </div>
    }


    async function getVouches(address: `0x${string}`) {
        type Details = {
            bucketCapacity: number;
            bucketLevel: number;
            label: string;
            count: number;
            value: number;
            addrs: string;
        };

        const [account] = await client.getAddresses()
        const vouchArray = (await publicClient.readContract({
            address: contract,
            abi,
            functionName: "getAllVouch",
            args: [address],
            account
        })) as string[];
        const facilitator = (await publicClient.readContract({
            address: contract,
            abi,
            functionName: "getDetails",
            args: [address],
            account: address as `0x${string}`,
        })) as Details;

        const a: any = JSON.parse(
            JSON.stringify(facilitator, (key, value) => {
                return typeof value === "bigint" ? value.toString() : value;
            })
        );

        return { addresses: vouchArray, facilitator: a };
    }

    async function isInDAO(address: `0x${string}`) {
        const val = await publicClient.readContract({
            address: contract,
            abi,
            functionName: "balanceOf",
            args: [address],
            account: address as `0x${string}`,
        });
        return Number(val) > 0;
    }


    return { JoinDAOButton, ExitDAOButton, VouchButton, getVouches, isInDAO }
}

export default useVouch;