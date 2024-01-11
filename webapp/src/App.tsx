import { ConnectKitButton } from 'connectkit';
import { useState } from 'react'
import { useAccount } from "wagmi";


export default function App() {
  const { address, isConnecting, isDisconnected } = useAccount()

  return <div>
    <ConnectKitButton />
    {address}
  </div>
}
