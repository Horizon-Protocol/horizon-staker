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
