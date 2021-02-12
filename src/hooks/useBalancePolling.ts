import { useCallback, useEffect } from "react";
import { useUpdateAtom } from "jotai/utils";
import useRequest from "@ahooksjs/use-request";
import { BigNumber } from "ethers";
import { useSnackbar } from "notistack";
import { availableAtomFamily } from "@atoms/balance";
import { loadingAvailableAtom } from "@atoms/loading";
import { Token } from "@utils/constants";
import { usePHB, useHZN } from "./useContract";
import useWallet from "./useWallet";

export default function useBalancePolling(interval: number = 10000) {
  const { account } = useWallet();

  const { enqueueSnackbar } = useSnackbar();

  const phbContract = usePHB();
  const hznContract = useHZN();

  // atoms
  const setLoading = useUpdateAtom(loadingAvailableAtom);
  const setAvailablePHB = useUpdateAtom(availableAtomFamily(Token.PHB));
  const setAvailableHZN = useUpdateAtom(availableAtomFamily(Token.HZN));
  // const setAvailableLP = useUpdateAtom(availableAtomFamily(Token.HZN_BNB_LP));

  const fetchBalances = useCallback(async () => {
    if (phbContract && hznContract) {
      setLoading(true);
      const [phb, hzn] = await Promise.all([
        phbContract.balanceOf(account),
        hznContract.balanceOf(account),
      ]);
      setAvailablePHB(phb as BigNumber);
      setAvailableHZN(hzn as BigNumber);
      window.requestAnimationFrame(() => {
        setLoading(false);
      });
    }
  }, [
    phbContract,
    hznContract,
    setLoading,
    account,
    setAvailablePHB,
    setAvailableHZN,
  ]);

  const { refresh } = useRequest(fetchBalances, {
    ready: !!(account && phbContract && hznContract),
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
