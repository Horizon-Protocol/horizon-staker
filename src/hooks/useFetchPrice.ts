import { useCallback, useState } from "react";
import { BigNumber, constants, utils } from "ethers";
import { useUpdateAtom } from "jotai/utils";
import { fetchPrice } from "@/apis/coingecko";
import { fetchTotalLiquidity } from "@/apis/pancakeswap";
import { tokenPriceAtomFamily } from "@atoms/price";
import { Token } from "@/utils/constants";
import { useLP } from "./useContract";

const lpDisabled = true;

export default function useFetchPrice() {
  const [timestamp, setTimestamp] = useState<number>(0);

  const lpToken = useLP();

  const setPHBPrice = useUpdateAtom(tokenPriceAtomFamily(Token.PHB));
  const setHZNPrice = useUpdateAtom(tokenPriceAtomFamily(Token.HZN));
  const setLpPrice = useUpdateAtom(tokenPriceAtomFamily(Token.HZN_BNB_LP));

  const run = useCallback(async () => {
    const now = Date.now() / 1000;

    if (now - timestamp < 5) {
      return;
    }
    setTimestamp(now);
    const [{ phb, hzn }, totalLiquidity, lpTotalSupply] = await Promise.all([
      fetchPrice(),
      lpDisabled ? 0 : fetchTotalLiquidity(),
      !lpDisabled && lpToken ? lpToken.totalSupply() : constants.Zero,
    ]);

    const lpPrice = lpTotalSupply.gt(0)
      ? utils.parseEther(totalLiquidity.toString()).div(lpTotalSupply)
      : BigNumber.from(0);

    setPHBPrice(phb);
    setHZNPrice(hzn);
    setLpPrice(lpPrice.toNumber());
  }, [lpToken, setHZNPrice, setLpPrice, setPHBPrice, timestamp]);

  return run;
}
