import React from "react";
import { CopyBlock } from 'react-code-blocks';



import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useContractRead } from "wagmi";

export default function Title() {
  const { address, isConnecting, isDisconnected } = useAccount();
 const code= "npm install karma-vouch";
 const language="bash";
 const showLineNumbers=true;


  return (
    <div className="flex flex-row justify-around	">
      <div className="w-2/5 h-[30rem]	border-solid border-black	border-4">
<h1 className="text-9xl	">Karma Vouch</h1>
<h2 className="text-3xl pt-8	">Elevating Trust in the Blockchain with Karma Vouch - Where DAO Members Validate Genuine Identities</h2>
     </div>
     <div className="w-2/5	border-solid border-black	border-4">
<h1>npm library!</h1>
<div className="w-72 border-solid border-black	border-4"><CopyBlock
      text={code}
      language={language}
    /></div>

     </div>
    </div>
  );
}
