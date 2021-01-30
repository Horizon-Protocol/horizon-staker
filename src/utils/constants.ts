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
    key: SUPPORTED_WALLET_ENUM.BINANCE,
    label: "Binance Chain Wallet",
    logo: BinanceLogo,
    injection: "BinanceChain",
  },
  {
    key: SUPPORTED_WALLET_ENUM.METAMASK,
    label: "Metamask",
    logo: MetamaskLogo,
    injection: "ethereum",
  },
];
