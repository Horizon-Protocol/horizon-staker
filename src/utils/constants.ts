import { Connectors } from "@binance-chain/bsc-use-wallet";
import BinanceLogo from "@assets/wallets/binance.svg";
import MetamaskLogo from "@assets/wallets/metamask.svg";

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
    [Token.PHB]: "0x171B2B6B6Efc088E3D77a3F5Cc1E0F9C9301F9dD",
    [Token.HZN]: "0x0B14682818B42fE1859999D159788abCd6f4C96F",
    [Token.HZN_BNB_LP]: "",
  },
};

const EnvChainId = parseInt(process.env.CHAIN_ID);

export const ChainId = [56, 97].indexOf(EnvChainId) > -1 ? EnvChainId : 97;
export const ChainName = CHAIN_NAME_MAP[ChainId];
export const Addresses = CONTRACT_ADDRESS[ChainId];
