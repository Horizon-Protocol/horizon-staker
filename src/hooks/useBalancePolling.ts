import { useCallback, useEffect } from "react";
import { useUpdateAtom } from "jotai/utils";
import useInterval from "@use-it/interval";
import { BigNumber } from "ethers";
import { useSnackbar } from "notistack";
import { availableAtomFamily } from "@atoms/balance";
import { loadingAvailableAtom } from "@atoms/loading";
import { Token } from "@utils/constants";
import { usePHB, useHZN } from "./useContract";
import useWallet from "./useWallet";

export default function useBalancePolling(delay: number = 10000) {
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
      try {
        const [phb, hzn] = await Promise.all([
          phbContract.balanceOf(account),
          hznContract.balanceOf(account),
        ]);
        setAvailablePHB(phb as BigNumber);
        setAvailableHZN(hzn as BigNumber);
      } catch (e) {
        console.log(e);
        enqueueSnackbar("Failed to loading balances", { variant: "error" });
      }
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
    enqueueSnackbar,
  ]);

  useInterval(fetchBalances, account ? delay : null);

  useEffect(() => {
    if (account) {
      fetchBalances();
    }
  }, [account, fetchBalances]);
}
