import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WagmiConfig, createConfig } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains"
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    infuraId: import.meta.env.VITE_INFURA_KEY, // or infuraId
    walletConnectProjectId: import.meta.env.VITE_WC_KEY,

    // Required
    appName: "E-Karma",

    // Optional
    appDescription: "Your own on-chain Karma point system",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",

    chains: [arbitrumSepolia]
  }),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
