// import { Wallet } from "@binance-chain/bsc-use-wallet";
import { createState, useState } from "@hookstate/core";
import { Wallet } from "@utils/constants";

export interface WalletState {
  open: boolean;
  detail?: Wallet;
}

const state = createState<WalletState>({
  open: false,
});

export function useWalletState() {
  // This function exposes the state directly.
  // i.e. the state is accessible directly outside of this module.
  // The state for settings in SettingsState.ts wraps the state by an interface.
  // Both options are valid and you need to use one or another,
  // depending on your circumstances. Apply your engineering judgement
  // to choose the best option. If unsure, exposing the state directly
  // like it is done below is a safe bet.
  return useState(state);
}
