declare namespace NodeJS {
  interface ProcessEnv {
    readonly CHAIN_ID: ChainEnum;
  }
}

declare namespace State {
  interface Wallet {
    open: boolean;
    detail?: WalletDetail;
  }

  interface BalanceDetail {
    staked: BigNumber;
    available: BigNumber;
  }
  interface Balance {
    [k: TokenEnum]: BalanceDetail;
  }
}
