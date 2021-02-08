declare namespace NodeJS {
  interface ProcessEnv {
    readonly CHAIN_ID: string;
  }
}

declare namespace State {
  interface Wallet {
    open: boolean;
    detail?: WalletDetail;
  }

  interface Balance {
    available: {
      [k: TokenEnum]: ethers.BigNumber;
    };
    staked: {
      [k: TokenEnum]: ethers.BigNumber;
    };
  }
}
