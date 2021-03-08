import { useCallback } from "react";
import { useUpdateAtom } from "jotai/utils";
import useRequest from "@ahooksjs/use-request";
import { useSnackbar } from "notistack";
import { loadingAllAtom } from "@atoms/loading";
import { availableAtomFamily } from "@atoms/balance";
import { Token } from "@utils/constants";
import { usePHB, useHZN } from "./useContract";
import useWallet from "./useWallet";
import useFetchStakingData from "./useFetchStakingData";

export default function useBalancePolling(interval: number = 0) {
  const { account } = useWallet();

  const { enqueueSnackbar } = useSnackbar();

  // token available
  const phbToken = usePHB();
  const hznToken = useHZN();
  // const lpToken = useLP();

  // all loading
  const setLoading = useUpdateAtom(loadingAllAtom);
  // available atoms
  const setAvailablePHB = useUpdateAtom(availableAtomFamily(Token.PHB));
  const setAvailableHZN = useUpdateAtom(availableAtomFamily(Token.HZN));
  // const setAvailableLP = useUpdateAtom(availableAtomFamily(Token.HZN_BNB_LP));

  // fetch token staking data
  const fetchPHBStakingData = useFetchStakingData(Token.PHB);
  const fetchHZNStakingData = useFetchStakingData(Token.HZN);
  // const fetchLPStakingData = useFetchStakingData(Token.HZN_BNB_LP)

  const fetchBalances = useCallback(async () => {
    if (account && phbToken && hznToken) {
      setLoading(true);
      const [phb, hzn] = await Promise.all([
        phbToken.balanceOf(account),
        hznToken.transferableSynthetix(account),
        fetchPHBStakingData(),
        fetchHZNStakingData(),
      ]);
      setAvailablePHB(phb);
      setAvailableHZN(hzn);

      window.requestAnimationFrame(() => {
        setLoading(false);
      });
    }
  }, [
    account,
    phbToken,
    hznToken,
    setLoading,
    fetchPHBStakingData,
    fetchHZNStakingData,
    setAvailablePHB,
    setAvailableHZN,
  ]);

  const { refresh } = useRequest(fetchBalances, {
    ready: !!(account && phbToken && hznToken),
    loadingDelay: 1000,
    pollingInterval: interval || undefined,
    pollingWhenHidden: false,
    refreshOnWindowFocus: true,
    throttleInterval: 1000,
    onError(e) {
      console.log(e);
      enqueueSnackbar("Failed to loading balances", { variant: "error" });
    },
  });

  return {
    refresh,
  };
}
