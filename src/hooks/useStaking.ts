import { STAKING_CONTRACT_ADDRESS } from "@utils/constants";
import stakingAbi from "@utils/abis/staking.json";
import useContract from "./useContract";

export default function useStaking() {
  return useContract(STAKING_CONTRACT_ADDRESS, stakingAbi);
}
