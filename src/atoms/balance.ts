import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { BigNumber, constants } from "ethers";
import { Token } from "@utils/constants";

export enum Balance {
  available = "available",
  staked = "staked",
  earned = "earned",
}

interface Param {
  token: Token;
  balance: Balance;
  amount?: BigNumber;
}

export const amountAtomFamily = atomFamily(
  ({ amount = constants.Zero }: Param) => amount,
  null,
  (a, b) => a.token === b.token && a.balance === b.balance
);

export const availableAtomFamily = atomFamily(
  (token: Token) => (get) =>
    get(amountAtomFamily({ token, balance: Balance.available })),
  (token: Token) => (get, set, amount: BigNumber) => {
    set(amountAtomFamily({ token, balance: Balance.available }), amount);
  }
);

export const stakedAtomFamily = atomFamily(
  (token: Token) => (get) =>
    get(amountAtomFamily({ token, balance: Balance.staked })),
  (token: Token) => (get, set, amount: BigNumber) => {
    set(amountAtomFamily({ token, balance: Balance.staked }), amount);
  }
);
export const earnedAtomFamily = atomFamily(
  (token: Token) => (get) =>
    get(amountAtomFamily({ token, balance: Balance.earned })),
  (token: Token) => (get, set, amount: BigNumber) => {
    set(amountAtomFamily({ token, balance: Balance.earned }), amount);
  }
);

type AllowanceParam = { token: Token; amount?: BigNumber };
const allowanceAtomFamily = atomFamily(
  ({ amount = constants.Zero }: AllowanceParam) => amount,
  null,
  (a, b) => a.token === b.token
);
export const tokenAllowanceAtomFamily = atomFamily(
  (token: Token) => (get) => get(allowanceAtomFamily({ token })),
  (token: Token) => (get, set, amount: BigNumber) =>
    set(allowanceAtomFamily({ token }), amount)
);
