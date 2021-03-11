import { BigNumber } from "ethers";
import numbro from "numbro";

numbro.setDefaults({
  thousandSeparated: true,
  trimMantissa: true,
});

const Ten = BigNumber.from(10);

export const getBalanceNumber = (balance: BigNumber, decimals = 18) =>
  balance.div(Ten.pow(decimals)).toNumber();

export const getFullDisplayBalance = (
  balance: BigNumber,
  format: numbro.Format = {},
  decimals = 18
) => {
  return numbro(getBalanceNumber(balance, decimals)).format({
    trimMantissa: true,
    ...format,
  });
};

export const formatNumber = (value: number, format: numbro.Format = {}) => {
  return numbro(value).format({
    trimMantissa: true,
    ...format,
  });
};

export const formatAddress = (address: string, size: number = 8) => {
  return `${address.slice(0, size)}...${address.slice(-size)}`;
};

// export const calculateAPY = (periodReward: BigNumber, hznPrice:BigNumber, hznTotalSupply:BigNumber, tokenPrice:BigNumber) => {
//   return (periodReward.mul(hznPrice.div(hznTotalSupply)).mul(tokenPrice))/7*365*100%
// }
