import { useCallback } from "react";
import { useUpdateAtom } from "jotai/utils";
import { fetchPrice } from "@/apis/coingecko";
import { tokenPriceAtomFamily } from "@atoms/price";
import { Token } from "@/utils/constants";

export default function useFetchPrice() {
  const setPHBPrice = useUpdateAtom(tokenPriceAtomFamily(Token.PHB));
  const setHZNPrice = useUpdateAtom(tokenPriceAtomFamily(Token.HZN));

  const run = useCallback(async () => {
    const { phb, hzn } = await fetchPrice();
    setPHBPrice(phb);
    setHZNPrice(hzn);
  }, [setHZNPrice, setPHBPrice]);

  return run;
}
