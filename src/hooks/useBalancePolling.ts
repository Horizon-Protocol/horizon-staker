import { useCallback } from "react";
import { useUpdateAtom } from "jotai/utils";
import useRequest from "@ahooksjs/use-request";
import { useSnackbar } from "notistack";
import {
  availableAtomFamily,
  stakedAtomFamily,
  earnedAtomFamily,
  withdrawableAtomFamily,
} from "@atoms/balance";
import { loadingAvailableAtom } from "@atoms/loading";
import { Token } from "@utils/constants";
import { usePHB, useHZN } from "./useContract";
import useStaking from "./useStaking";
import useWallet from "./useWallet";

export default function useBalancePolling(interval: number = 5000) {
  const { account } = useWallet();

  const { enqueueSnackbar } = useSnackbar();

  const phbToken = usePHB();
  const hznToken = useHZN();
  const phbStaking = useStaking();

  // available atoms
  const setLoading = useUpdateAtom(loadingAvailableAtom);
  const setAvailablePHB = useUpdateAtom(availableAtomFamily(Token.PHB));
  const setAvailableHZN = useUpdateAtom(availableAtomFamily(Token.HZN));
  // const setAvailableLP = useUpdateAtom(availableAtomFamily(Token.HZN_BNB_LP));

  // staked
  const setStakedPHB = useUpdateAtom(stakedAtomFamily(Token.PHB));
  // earned
  const setEarnedPHB = useUpdateAtom(earnedAtomFamily(Token.PHB));
  // earned
  const setWithdrawablePHB = useUpdateAtom(withdrawableAtomFamily(Token.PHB));

  const fetchBalances = useCallback(async () => {
    if (account && phbToken && hznToken) {
      setLoading(true);
      const [phb, hzn, staked, earned, withdrawable] = await Promise.all([
        phbToken.balanceOf(account),
        hznToken.balanceOf(account),
        phbStaking.balanceOf(account), // user staked
        phbStaking.earned(account), // user staked
        phbStaking.withdrawableAmount(account), // user withdrawable Amount
        // phbStaking.totalSupply(), // total staked
      ]);
      setAvailablePHB(phb);
      setAvailableHZN(hzn);
      setStakedPHB(staked);
      setEarnedPHB(earned);
      setWithdrawablePHB(withdrawable);

      window.requestAnimationFrame(() => {
        setLoading(false);
      });
    }
  }, [
    account,
    phbToken,
    hznToken,
    phbStaking,
    setLoading,
    setAvailablePHB,
    setAvailableHZN,
    setStakedPHB,
    setEarnedPHB,
    setWithdrawablePHB,
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
