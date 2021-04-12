import { useCallback } from "react";
import { useUpdateAtom } from "jotai/utils";
import { BigNumber, constants } from "ethers";
import {
  stakedAtomFamily,
  earnedAtomFamily,
  withdrawableAtomFamily,
} from "@atoms/balance";
import { tokenStatAtomFamily } from "@atoms/stat";
import useWallet from "./useWallet";
import useStaking from "./useStaking";
import { BSC_BLOCK_TIME } from "@/utils/constants";

export default function useFetchStakingData(token: TokenEnum) {
  const { account } = useWallet();
  const stakingContract = useStaking(token);

  // staked
  const setStaked = useUpdateAtom(stakedAtomFamily(token));

  // earned
  const setEarned = useUpdateAtom(earnedAtomFamily(token));

  // withdraw
  const setWithdrawable = useUpdateAtom(withdrawableAtomFamily(token));

  // withdraw
  const setStat = useUpdateAtom(tokenStatAtomFamily(token));

  const fetchData = useCallback(async () => {
    let res: BigNumber[] = [];
    if (account && stakingContract) {
      res = await Promise.all([
        stakingContract.balanceOf(account), // user staked
        stakingContract.earned(account), // user staked
        stakingContract.withdrawableAmount(account), // user withdrawable Amount
        stakingContract.totalSupply(), // total staked
        stakingContract.periodFinish(), // finish time
        stakingContract.rewardRate(), // total reward for current duration
        stakingContract.rewardsDuration(), // rewardDuration in seconds
        stakingContract.lockDownDuration(), // lockDownDuration in seconds
      ]);
    }
    const [
      staked = constants.Zero,
      earned = constants.Zero,
      withdrawable = constants.Zero,
      totalStaked = constants.Zero,
      finish = constants.Zero,
      rewardPerSecond = constants.Zero,
      lockDownSeconds = constants.Zero,
    ] = res;
    setStaked(staked);
    setEarned(earned);
    setWithdrawable(withdrawable);
    setStat({
      total: totalStaked,
      finish,
      rewardPerBlock: rewardPerSecond.div(BSC_BLOCK_TIME),
      lockDownSeconds,
    });
    return constants.Zero;
  }, [
    account,
    setEarned,
    setStaked,
    setStat,
    setWithdrawable,
    stakingContract,
  ]);

  return fetchData;
}
