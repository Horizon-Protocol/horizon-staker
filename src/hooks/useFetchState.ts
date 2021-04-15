import { useCallback } from "react";
import { constants } from "ethers";
import { useUpdateAtom } from "jotai/utils";
import { useSnackbar } from "notistack";
import { loadingAllAtom } from "@atoms/loading";
import { availableAtomFamily } from "@atoms/balance";
import { Token } from "@utils/constants";
import { usePHB, useHZN, useLP } from "./useContract";
import useWallet from "./useWallet";
import useFetchStakingData from "./useFetchStakingData";
import useFetchPrice from "./useFetchPrice";

export default function useFetchState() {
  const { account } = useWallet();

  const { enqueueSnackbar } = useSnackbar();

  // token available
  const phbToken = usePHB();
  const hznToken = useHZN();
  const lpToken = useLP();

  // price
  const fetchPrice = useFetchPrice();

  // all loading
  const setLoading = useUpdateAtom(loadingAllAtom);

  // available atoms
  const setAvailablePHB = useUpdateAtom(availableAtomFamily(Token.PHB));
  const setAvailableHZN = useUpdateAtom(availableAtomFamily(Token.HZN));
  const setAvailableLP = useUpdateAtom(availableAtomFamily(Token.HZN_BNB_LP));

  // fetch token staking data
  const fetchPHBStakingData = useFetchStakingData(Token.PHB);
  const fetchHZNStakingData = useFetchStakingData(Token.HZN);
  const fetchLPStakingData = useFetchStakingData(Token.HZN_BNB_LP);

  const fetchBalances = useCallback(async () => {
    try {
      setLoading(true);
      const [phb, hzn, lp] = await Promise.all([
        account && phbToken ? phbToken.balanceOf(account) : constants.Zero,
        account && hznToken
          ? hznToken.transferableSynthetix(account)
          : constants.Zero,
        account && lpToken ? lpToken.balanceOf(account) : constants.Zero,
        fetchPHBStakingData(),
        fetchHZNStakingData(),
        fetchLPStakingData(),
        fetchPrice(),
      ]);

      setAvailablePHB(phb);
      setAvailableHZN(hzn);
      setAvailableLP(lp);
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Failed to loading balances", { variant: "error" });
    }
    setLoading(false);
  }, [
    setLoading,
    account,
    phbToken,
    hznToken,
    lpToken,
    fetchPHBStakingData,
    fetchHZNStakingData,
    fetchLPStakingData,
    fetchPrice,
    setAvailablePHB,
    setAvailableHZN,
    setAvailableLP,
    enqueueSnackbar,
  ]);

  return fetchBalances;
}
