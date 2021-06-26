import { useCallback, useState } from "react";
import { constants } from "ethers";
import { useUpdateAtom } from "jotai/utils";
import { fetchPrice } from "@/apis/coingecko";
import { tokenPriceAtomFamily } from "@atoms/price";
import erc20Abi from "@abis/erc20.json";
import { Erc20 } from "@abis/types";
import { TokenAddresses, Token } from "@utils/constants";
import { etherToBN } from "@/utils/number";
import { useRpcContract } from "./useContract";

const lpDisabled = false;

export default function useFetchPrice() {
  const [timestamp, setTimestamp] = useState<number>(0);

  const hznToken = useRpcContract(TokenAddresses[Token.HZN], erc20Abi) as Erc20;

  const lpToken = useRpcContract(
    TokenAddresses[Token.HZN_BNB_LP],
    erc20Abi
  ) as Erc20;

  const setPHBPrice = useUpdateAtom(tokenPriceAtomFamily(Token.PHB));
  const setHZNPrice = useUpdateAtom(tokenPriceAtomFamily(Token.HZN));
  const setLpPrice = useUpdateAtom(tokenPriceAtomFamily(Token.HZN_BNB_LP));

  const run = useCallback(async () => {
    const now = Date.now() / 1000;

    if (now - timestamp < 5) {
      return;
    }
    setTimestamp(now);

    const [{ phb, hzn }, hznInLp, lpTotalSupply] = await Promise.all([
      fetchPrice(),
      !lpDisabled && hznToken
        ? hznToken.balanceOf(TokenAddresses[Token.HZN_BNB_LP])
        : constants.Zero,
      !lpDisabled && lpToken ? lpToken.totalSupply() : constants.Zero,
    ]);

    const hznInLpBN = etherToBN(hznInLp);
    const lpTotalSupplyBN = etherToBN(lpTotalSupply);
    const totalLpInUSD = hznInLpBN.multipliedBy(2).multipliedBy(hzn);

    const lpPrice = lpTotalSupplyBN.gt(0)
      ? totalLpInUSD.div(lpTotalSupplyBN).toNumber()
      : 0;

    setPHBPrice(phb);
    setHZNPrice(hzn);
    setLpPrice(lpPrice);
  }, [hznToken, lpToken, setHZNPrice, setLpPrice, setPHBPrice, timestamp]);

  return run;
}
