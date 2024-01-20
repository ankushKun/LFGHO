import React from "react";
import logo from '/home/bhawna/Desktop/LFGHO/webapp/public/vite.svg';
import { ConnectKitButton } from "connectkit";


export default function Navbar() {

  return (
    <div>

      {/* Top Navbar */}
      <nav className="bg-white p-4 w-full h-24  border-double border-black	border-8">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="mr-5 h-12 w-12" />
            <span className="text-gray-800 text-xl font-bold">K-VOUCH</span>
          </div>

          {/* Button */}
          <button className="">
            <ConnectKitButton />
          </button>
        </div>
      </nav>
    </div>
  );
}
