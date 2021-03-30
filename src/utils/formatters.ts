import { BigNumber, utils } from "ethers";
import numbro from "numbro";

numbro.setDefaults({
  thousandSeparated: true,
  mantissa: 2,
  // trimMantissa: true,
  roundingFunction: Math.floor,
});

export const getFullDisplayBalance = (
  balance: BigNumber,
  format: numbro.Format = {}
) => {
  return numbro(utils.formatEther(balance)).format({
    ...format,
  });
};

export const formatNumber = (value: number, format: numbro.Format = {}) => {
  return numbro(value).format({
    ...format,
  });
};

export const formatAddress = (address: string, size: number = 8) => {
  return `${address.slice(0, size)}...${address.slice(-size)}`;
};

/*
  ((reward for this period * reward Price/ total staked *staking token price )/period)*365*100%
*/
export const calculateAPY = (
  stakingTokenPrice: BigNumber,
  totalStaked: BigNumber,
  rewardTokenPrice: BigNumber,
  totalPeriodReward: BigNumber,
  rewardSeconds: BigNumber
) => {
  const periodInDays = rewardSeconds.div(BigNumber.from(3600 * 24));
  const totalRewardValue = rewardTokenPrice.mul(totalPeriodReward);
  const totalStakingValue = stakingTokenPrice.mul(totalStaked);
  const apy = totalRewardValue
    .div(totalStakingValue)
    .div(periodInDays)
    .mul(365)
    .mul(100);
  console.log(apy.toString());

  return;
};
