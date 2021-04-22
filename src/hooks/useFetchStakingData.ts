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
import { BSC_BLOCK_TIME, Token } from "@/utils/constants";

export default function useFetchStakingData(token: TokenEnum) {
  const { account } = useWallet();
  const stakingContract = useStaking(token);

  const isLegacy = token === Token.HZN_BNB_LP_LEGACY;

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
        isLegacy ? constants.Zero : stakingContract.periodFinish(), // finish time
        isLegacy ? constants.Zero : stakingContract.rewardRate(), // rewards per second
        // stakingContract.rewardsDuration(), // rewardDuration in seconds
        stakingContract.lockDownDuration(), // lockDownDuration in seconds
      ]);
    }
    const [
      staked = constants.Zero,
      earned = constants.Zero,
      withdrawable = constants.Zero,
      totalStaked = constants.Zero,
      periodFinish = constants.Zero,
      rewardsPerSecond = constants.Zero,
      // rewardsDurationSeconds = constants.Zero,
      lockDownSeconds = constants.Zero,
    ] = res;
    setStaked(staked);
    setEarned(earned);
    setWithdrawable(withdrawable);
    const finishTimestamp = periodFinish.toNumber();
    const now = Date.now() / 1000;
    setStat({
      isRoundActive: finishTimestamp > 0 && now < finishTimestamp,
      total: totalStaked,
      rewardsPerBlock: rewardsPerSecond.mul(BSC_BLOCK_TIME),
      // rewardsDurationSeconds,
      lockDownSeconds,
    });
    return constants.Zero;
  }, [
    account,
    isLegacy,
    setEarned,
    setStaked,
    setStat,
    setWithdrawable,
    stakingContract,
  ]);

  return fetchData;
}
