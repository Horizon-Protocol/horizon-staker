import { atomFamily } from "jotai/utils";
import { BigNumber, constants } from "ethers";
import { Token } from "@utils/constants";

interface Param {
  token: Token;
  price?: BigNumber;
}

export const priceAtomFamily = atomFamily(
  ({ price = constants.Zero }: Param) => price,
  null,
  (a, b) => a.token === b.token
);

export const tokenPriceAtomFamily = atomFamily(
  (token: Token) => (get) => get(priceAtomFamily({ token })),
  (token: Token) => (get, set, price: BigNumber) => {
    set(priceAtomFamily({ token }), price);
  }
);
