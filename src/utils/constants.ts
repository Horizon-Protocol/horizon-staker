import BinanceLogo from "@assets/wallets/binance.svg";
import MetamaskLogo from "@assets/wallets/metamask.svg";

export enum SUPPORTED_WALLET_ENUM {
  BINANCE,
  METAMASK,
}

export interface Wallet {
  key: SUPPORTED_WALLET_ENUM;
  label: string;
  logo: string;
  injection: string;
}

export const SUPPORTED_WALLETS: Wallet[] = [
  {
    key: SUPPORTED_WALLET_ENUM.METAMASK,
    label: "Metamask",
    logo: MetamaskLogo,
    injection: "ethereum",
  },
  {
    key: SUPPORTED_WALLET_ENUM.BINANCE,
    label: "Binance Wallet",
    logo: BinanceLogo,
    injection: "BinanceChain",
  },
];

export enum NETWORK {
  MAINNET = 56, // BSC
  TESTNET = 97, // BSC testnet
}

export const BSC_JSON_RPC_URLS = {
  [NETWORK.MAINNET]: `https://bsc-dataseed.binance.org/`,
  [NETWORK.TESTNET]: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
};

export const CONTRACT_ADDRESS = {
  phb: {
    [NETWORK.MAINNET]: "",
    [NETWORK.TESTNET]: "0x171B2B6B6Efc088E3D77a3F5Cc1E0F9C9301F9dD",
  },
  hzn: {
    [NETWORK.MAINNET]: "",
    [NETWORK.TESTNET]: "0x0B14682818B42fE1859999D159788abCd6f4C96F",
  },
  bnb: {
    [NETWORK.MAINNET]: "",
    [NETWORK.TESTNET]: "",
  },
};
