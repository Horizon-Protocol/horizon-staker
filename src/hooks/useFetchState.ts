import { useCallback } from "react";
import { useUpdateAtom } from "jotai/utils";
import { useSnackbar } from "notistack";
import { loadingAllAtom } from "@atoms/loading";
import { availableAtomFamily } from "@atoms/balance";
import { Token } from "@utils/constants";
import { usePHB, useHZN } from "./useContract";
import useWallet from "./useWallet";
import useFetchStakingData from "./useFetchStakingData";

export default function useFetchState() {
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
      try {
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
      } catch (e) {
        console.log(e);
        enqueueSnackbar("Failed to loading balances", { variant: "error" });
      }
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
    enqueueSnackbar,
  ]);

  return fetchBalances;
}
