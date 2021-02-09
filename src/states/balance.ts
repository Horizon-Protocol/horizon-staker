// import { Wallet } from "@binance-chain/bsc-use-wallet";
import { createState, useState } from "@hookstate/core";
import { BigNumber, constants } from "ethers";
import { Token } from "@utils/constants";

// WARN: hookstate doesn't support non js primitive values

type BalanceDetail = {
  [k in TokenEnum]: BigNumber;
};
type StatsDetail = {
  [k in TokenEnum]: {
    apy: number;
    total: BigNumber;
  };
};
interface Balance {
  loading: boolean;
  available: BalanceDetail;
  staked: BalanceDetail;
  earned: BalanceDetail;
  stats: StatsDetail;
}

const state = createState<Balance>({
  loading: false,
  available: {
    [Token.PHB]: constants.Zero,
    [Token.HZN]: constants.Zero,
    [Token.HZN_BNB_LP]: constants.Zero,
  },
  staked: {
    [Token.PHB]: constants.Zero,
    [Token.HZN]: constants.Zero,
    [Token.HZN_BNB_LP]: constants.Zero,
  },
  earned: {
    [Token.PHB]: constants.Zero,
    [Token.HZN]: constants.Zero,
    [Token.HZN_BNB_LP]: constants.Zero,
  },
  stats: {
    [Token.PHB]: {
      apy: 0,
      total: constants.Zero,
    },
    [Token.HZN]: {
      apy: 0,
      total: constants.Zero,
    },
    [Token.HZN_BNB_LP]: {
      apy: 0,
      total: constants.Zero,
    },
  },
});

export default function useBalanceState() {
  // This function exposes the state directly.
  // i.e. the state is accessible directly outside of this module.
  // The state for settings in SettingsState.ts wraps the state by an interface.
  // Both options are valid and you need to use one or another,
  // depending on your circumstances. Apply your engineering judgement
  // to choose the best option. If unsure, exposing the state directly
  // like it is done below is a safe bet.
  return useState(state);
}
