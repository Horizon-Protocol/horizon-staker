// import { Wallet } from "@binance-chain/bsc-use-wallet";
import { atom } from "jotai";

export const openAtom = atom(false);
export const detailAtom = atom<WalletDetail | null>(null);
