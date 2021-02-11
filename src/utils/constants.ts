import { Connectors } from "@binance-chain/bsc-use-wallet";
import BinanceLogo from "@assets/wallets/binance.svg";
import MetamaskLogo from "@assets/wallets/metamask.svg";

export enum Token {
  PHB = "PHB",
  HZN = "HZN",
  HZN_BNB_LP = "HZN-BNB LP",
}

export const TokenShortName = {
  [Token.PHB]: "PHB",
  [Token.HZN]: "HZN",
  [Token.HZN_BNB_LP]: "LP",
};

export enum SupportedWallet {
  Metamask = "Metamask",
  Binance = "Binance",
}

declare global {
  type TokenEnum = Token;
  type SupportedWalletEnum = SupportedWallet;

  interface WalletDetail {
    key: SupportedWalletEnum;
    label: string;
    logo: string;
    connectorId: keyof Connectors;
  }
}

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

export const CHAIN_NAME_MAP: {
  [chain: number]: string;
} = {
  56: "BSC Mainnet",
  97: "BSC Testnet",
};

export const CONTRACT_ADDRESS: {
  [chain: number]: {
    [t in Token]: string;
  };
} = {
  56: {
    [Token.PHB]: "",
    [Token.HZN]: "",
    [Token.HZN_BNB_LP]: "",
  },
  97: {
    [Token.PHB]: "0xf09f5e21f86692c614d2d7b47e3b9729dc1c436f",
    [Token.HZN]: "0xe2fff5156e4148441607e12d082314f38d2612ff",
    [Token.HZN_BNB_LP]: "",
  },
};
export const STAKING_CONTRACT_ADDRESS =
  "0xE90E071d27B4F62460Fe6dF82bE8c05a9f601B6a";

const EnvChainId = parseInt(process.env.CHAIN_ID);

export const ChainId = [56, 97].indexOf(EnvChainId) > -1 ? EnvChainId : 97;
export const ChainName = CHAIN_NAME_MAP[ChainId];
export const Addresses = CONTRACT_ADDRESS[ChainId];
