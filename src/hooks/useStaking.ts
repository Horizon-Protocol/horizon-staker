import { StakingAddresses } from "@utils/constants";
import abi from "@abis/staking.json";
import { Staking } from "@abis/types";
import useContract from "./useContract";

export default function useStaking(token: TokenEnum) {
  const contract = useContract(StakingAddresses[token], abi, true);

  return contract as Staking;
}
