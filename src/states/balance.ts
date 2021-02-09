// import { Wallet } from "@binance-chain/bsc-use-wallet";
import { createState, useState } from "@hookstate/core";
import { Token } from "@utils/constants";

interface Balance {
  loading: false;
  available: {
    [k in TokenEnum]: number;
  };
  staked: {
    [k in TokenEnum]: number;
  };
}

const state = createState<Balance>({
  loading: false,
  available: {
    [Token.PHB]: 0,
    [Token.HZN]: 0,
    [Token.HZN_BNB_LP]: 0,
  },
  staked: {
    [Token.PHB]: 0,
    [Token.HZN]: 0,
    [Token.HZN_BNB_LP]: 0,
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
