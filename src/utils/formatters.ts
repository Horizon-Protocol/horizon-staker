import { BigNumber, constants } from "ethers";

export const DemoAmount = BigNumber.from("1952428793453544044");

const Ten = BigNumber.from(10);

export const getBalanceNumber = (balance: BigNumber, decimals = 18) =>
  balance.div(Ten.pow(decimals)).toNumber();

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return getBalanceNumber(balance, decimals).toFixed();
};

export const formatAddress = (address: string, size: number = 8) => {
  return `${address.slice(0, size)}...${address.slice(-size)}`;
};
