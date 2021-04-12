import { atomFamily } from "jotai/utils";
import { BigNumber, constants } from "ethers";
import { Token } from "@utils/constants";

interface Data {
  total: BigNumber; // total staked
  finish: BigNumber;
  rewardPerBlock: BigNumber; // tokens per BSC block
  lockDownSeconds: BigNumber; // lockdown period in seconds
}

interface Param {
  token: Token;
  data?: Data;
}

const defaultData: Data = {
  total: constants.Zero,
  finish: constants.Zero,
  rewardPerBlock: constants.Zero,
  lockDownSeconds: constants.Zero,
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
