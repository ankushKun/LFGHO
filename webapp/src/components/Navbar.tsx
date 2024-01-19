import React from "react";
import { ConnectKitButton } from "connectkit";


export default function Navbar() {

  return (
    <div>
      <nav className="w-full h-24 grid grid-cols-[8rem_3fr_1fr_8rem] border-double border-black	border-8	">
        <div className="col-start-2 col-span-1 flex items-center ml-24">
          <h1 className="text-4xl font-bold	">K-VOUCH</h1>
        </div>
        <div  className="col-start-3 col-span-1 flex items-center my-0 mx-auto" >
          <ConnectKitButton />
        </div>
      </nav>
    </div>
  );
}
