# Karma Vouch WebAPP

An on-chain vouch based Karma system for DAOs, enabling a trust based approach for figuring out the legitimacy of an Address

To install the npm library check [here](npmjs.com/package/karma-vouch)

[![npm version](https://badge.fury.io/js/karma-vouch.svg)](https://badge.fury.io/js/karma-vouch)

Smart Contract, package and website all are in there separate folder [contracts](https://github.com/ankushKun/LFGHO/tree/main/contracts), [package](https://github.com/ankushKun/LFGHO/tree/main/package) and [webapp](https://github.com/ankushKun/LFGHO/tree/main/webapp) respectively

[Live Demo](https://karma-vouch.vercel.app/)

Built during [LFGHO](https://ethglobal.com/events/lfgho/home)

# Index

- [Karma Vouch WebAPP](#karma-vouch-webapp)
- [Index](#index)
- [About](#about)
  - [Techstack](#techstack)
- [How to setup](#how-to-setup)
  - [Clone the repo](#clone-the-repo)
  - [Install dependencies](#install-dependencies)
  - [Create a .env file](#create-a-env-file)
- [Finally run the webapp](#finally-run-the-webapp)
- [License](#license)



# About

An on-chain vouch based Karma system for DAOs, enabling a trust based approach for figuring out the legitimacy of an Address

## Techstack

    - Vite + ReactJS with Typescript
    - Tailwind CSS
    - Connect Kit
    - Viem
    - IGhoToken.sol Smart Contract
    - Solidity
    - Hardhat

# How to setup

## Clone the repo

Clone the repo

```bash
git clone git@github.com:ankushKun/LFGHO.git
cd webapp
```
## Install dependencies

```bash
npm install
```
## Create a .env file

Create a .env file in webapp folder and add the following variables:

```bash
VITE_INFURA_KEY="Your Infura Key"
VITE_WC_KEY="ProjectId"
VITE_CONTRACT="0x000E65B85A0f89f1006bC5202ecBE70D249698Ad"
```

To get VITE_WC_KEY click [here](https://cloud.walletconnect.com/sign-in) 
 - Click on create project
 - Enter the project name (anything)
 - Click on Type - Wallet
 - Copy the Project ID and paste it in a .env file of yours

 # Finally run the webapp

```bash
npm run dev
```

The webapp will be running on [localhost](localhost:5173)

To open the same application of another device for testing purposes, make sure that the device is connected to the same network as the device on which the webapp is running. Then visit http://<IP_ADDRESS_OF_THE_DEVICE_RUNNING_THE_WEBAPP>:5173

# License

The projects is licensed under [MIT](https://choosealicense.com/licenses/mit/)
