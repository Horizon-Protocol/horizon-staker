import { BigNumber, utils } from "ethers";
import { REWARD_PER_BLOCK, BLOCKS_PER_YEAR } from "@utils/constants";

/**
 * Get the APY value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APY is NaN or infinite.
 */
export const getApy = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: BigNumber,
  rewardPerBlock: BigNumber
): number => {
  const totalRewardPricePerYear = utils
    .parseEther(rewardTokenPrice.toString())
    .mul(rewardPerBlock)
    .mul(BLOCKS_PER_YEAR);

  const totalStakingTokenInPool = utils
    .parseEther(stakingTokenPrice.toString())
    .mul(totalStaked);

  if (totalStakingTokenInPool.eq(0)) {
    return 0;
  }
  const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).mul(100);
  console.log("apy:", apy, apy.toString());
  // return apy.is () || !apy.isFinite() ? null : apy.toNumber();

  return apy.toNumber();
};
