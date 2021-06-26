import bignumber from "bignumber.js";
import { ethers, utils } from "ethers";

declare global {
  interface BN extends bignumber {}
}

// ui defaults
export const DEFAULT_SEARCH_DEBOUNCE_MS = 300;
export const DEFAULT_REQUEST_REFRESH_INTERVAL = 30000; // 30s
export const DEFAULT_CRYPTO_DECIMALS = 4;
export const DEFAULT_FIAT_DECIMALS = 2;
export const DEFAULT_NUMBER_DECIMALS = 2;
export const DEFAULT_PERCENT_DECIMALS = 2;

export type NumericValue = BN | string | number;

export type FormatNumberOptions = {
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

export const SHORT_CRYPTO_CURRENCY_DECIMALS = 4;
export const LONG_CRYPTO_CURRENCY_DECIMALS = 8;

export const getDecimalPlaces = (value: NumericValue) =>
  (value.toString().split(".")[1] || "").length;

export const toBN = (value: NumericValue) =>
  bignumber.isBigNumber(value) ? value : new bignumber(value);

export const etherToBN = (value: ethers.BigNumber) =>
  toBN(utils.formatEther(value));

export function BNToEther(value: BN): ethers.BigNumber {
  return utils.parseUnits(value.toString());
}

export const zeroBN = toBN(0);

export const maxBN = bignumber.maximum;

export const minBN = bignumber.minimum;

export const formatNumber = (
  value: NumericValue,
  options?: FormatNumberOptions
) => {
  const prefix = options?.prefix;
  const suffix = options?.suffix;

  const formattedValue = [];
  if (prefix) {
    formattedValue.push(prefix);
  }

  formattedValue.push(
    toBN(value).toFormat(
      options?.decimals ?? DEFAULT_NUMBER_DECIMALS,
      bignumber.ROUND_HALF_EVEN
    )
  );
  if (suffix) {
    formattedValue.push(` ${suffix}`);
  }

  return formattedValue.join("");
};

export const formatPercent = (
  value: NumericValue,
  options?: { minDecimals: number }
) => {
  return formatNumber(Number(value) * 100);
};

export function formatUnits(
  value: any,
  units: number,
  decimals?: number
): string {
  return formatNumber(toBN(value.toString()).dividedBy(toBN(10).pow(units)), {
    decimals: decimals,
  });
}
