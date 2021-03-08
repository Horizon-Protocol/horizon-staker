import { atomFamily } from "jotai/utils";
import { BigNumber, constants } from "ethers";
import { Token } from "@utils/constants";

interface Data {
  apy: number;
  total: BigNumber;
  finish: BigNumber;
}

interface Param {
  token: Token;
  data?: Data;
}

const defaultData: Data = {
  apy: 0,
  total: constants.Zero,
  finish: constants.Zero,
};

export const statAtomFamily = atomFamily(
  ({ data = defaultData }: Param) => data,
  null,
  (a, b) => a.token === b.token
);

export const tokenStatAtomFamily = atomFamily(
  (token: Token) => (get) => get(statAtomFamily({ token })),
  (token: Token) => (get, set, data: Data) => {
    set(statAtomFamily({ token }), data);
  }
);
