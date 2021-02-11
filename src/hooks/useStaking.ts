import { STAKING_CONTRACT_ADDRESS } from "@utils/constants";
import stakingAbi from "@abis/staking.json";
import useContract from "./useContract";

export default function useStaking() {
  const contract = useContract(STAKING_CONTRACT_ADDRESS, stakingAbi, true);

  return contract;
}
