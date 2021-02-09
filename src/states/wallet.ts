// import { Wallet } from "@binance-chain/bsc-use-wallet";
import { createState, useState } from "@hookstate/core";

interface Wallet {
  open: boolean;
  detail?: WalletDetail;
}

const state = createState<Wallet>({
  open: false,
});

export default function useWalletState() {
  // This function exposes the state directly.
  // i.e. the state is accessible directly outside of this module.
  // The state for settings in SettingsState.ts wraps the state by an interface.
  // Both options are valid and you need to use one or another,
  // depending on your circumstances. Apply your engineering judgement
  // to choose the best option. If unsure, exposing the state directly
  // like it is done below is a safe bet.
  return useState(state);
}
