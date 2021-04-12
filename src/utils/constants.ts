import { Connectors } from "@binance-chain/bsc-use-wallet";
import BinanceLogo from "@assets/wallets/binance.svg";
import MetamaskLogo from "@assets/wallets/metamask.svg";
import { BigNumber } from "ethers";

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

export const TOKEN_CONTRACT_ADDRESS: {
  [chain: number]: {
    [t in Token]: string;
  };
} = {
  56: {
    [Token.PHB]: "0xdff88a0a43271344b760b58a35076bf05524195c",
    [Token.HZN]: "0xc0eff7749b125444953ef89682201fb8c6a917cd",
    [Token.HZN_BNB_LP]: "",
  },
  97: {
    [Token.PHB]: "0xf09f5e21f86692c614d2d7b47e3b9729dc1c436f",
    [Token.HZN]: "0x74ba52975dd4f0a9cde1b8d4d54b808ef9d0a3f8",
    [Token.HZN_BNB_LP]: "",
  },
};

// horizon summary contract
export const SUMMARY_CONTRACT_ADDRESS: {
  [chain: number]: string;
} = {
  56: "",
  97: "0x19165a78Abd8ec4a2eAC02d98d527b698Bb9c526",
};

// staking contract
export const STAKING_CONTRACT_ADDRESS: {
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
    [Token.PHB]: "0x04f8bd779921F3df6EF0E98e4D2fb00D77ae051B",
    [Token.HZN]: "0x601CC64c274E907D038a655B27B32174B28623Fc",
    [Token.HZN_BNB_LP]: "",
  },
};

const EnvChainId = parseInt(process.env.REACT_APP_CHAIN_ID);

export const ChainId = [56, 97].indexOf(EnvChainId) > -1 ? EnvChainId : 97;
export const ChainName = CHAIN_NAME_MAP[ChainId];
export const TokenAddresses = TOKEN_CONTRACT_ADDRESS[ChainId];
export const SummaryAddress = SUMMARY_CONTRACT_ADDRESS[ChainId];
export const StakingAddresses = STAKING_CONTRACT_ADDRESS[ChainId];

export const REWARD_PER_BLOCK: { [t in Token]: BigNumber } = {
  [Token.PHB]: BigNumber.from(50),
  [Token.HZN]: BigNumber.from(50),
  [Token.HZN_BNB_LP]: BigNumber.from(50),
};

// BSC 3 seconds per block
export const BSC_BLOCK_TIME = 3;
// BSC Blocks per year
export const BLOCKS_PER_YEAR = BigNumber.from(
  (60 / BSC_BLOCK_TIME) * 60 * 24 * 365
); // 10512000
