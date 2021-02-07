import { Connectors } from "@binance-chain/bsc-use-wallet";
import BinanceLogo from "@assets/wallets/binance.svg";
import MetamaskLogo from "@assets/wallets/metamask.svg";

export enum CHAIN {
  MAINNET = "MAINNET", // BSC
  TESTNET = "TESTNET", // BSC testnet
}

export enum Token {
  PHB = "PHB",
  HZN = "HZN",
  HZN_BNB_LP = "HZN-BNB LP",
}

export enum SupportedWallet {
  Metamask = "Metamask",
  Binance = "Binance",
}

declare global {
  type ChainEnum = CHAIN;
  type TokenEnum = Token;
  type SupportedWalletEnum = SupportedWallet;

  interface WalletDetail {
    key: SupportedWalletEnum;
    label: string;
    logo: string;
    connectorId: keyof Connectors;
  }
}

export const CHAIN_MAP = {
  [CHAIN.MAINNET]: 56,
  [CHAIN.TESTNET]: 97,
};

export const SUPPORTED_WALLETS: WalletDetail[] = [
  {
    key: SupportedWallet.Metamask,
    label: "Metamask",
    logo: MetamaskLogo,
    connectorId: "injected",
  },
  {
    key: SupportedWallet.Binance,
    label: "Binance Wallet",
    logo: BinanceLogo,
    connectorId: "bsc",
  },
];

export const BSC_JSON_RPC_MAP = {
  [CHAIN.MAINNET]: `https://bsc-dataseed.binance.org/`,
  [CHAIN.TESTNET]: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
};

export const CONTRACT_ADDRESS = {
  phb: {
    [CHAIN.MAINNET]: "",
    [CHAIN.TESTNET]: "0x171B2B6B6Efc088E3D77a3F5Cc1E0F9C9301F9dD",
  },
  hzn: {
    [CHAIN.MAINNET]: "",
    [CHAIN.TESTNET]: "0x0B14682818B42fE1859999D159788abCd6f4C96F",
  },
  bnb: {
    [CHAIN.MAINNET]: "",
    [CHAIN.TESTNET]: "",
  },
};

export const ChainId: CHAIN = process.env.CHAIN_ID || CHAIN.TESTNET;
