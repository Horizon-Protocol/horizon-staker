import { useCallback } from "react";
import { constants } from "ethers";
import { useUpdateAtom } from "jotai/utils";
import { useSnackbar } from "notistack";
import { loadingAllAtom } from "@atoms/loading";
import { availableAtomFamily } from "@atoms/balance";
import { Token } from "@utils/constants";
import { usePHB, useHZN } from "./useContract";
import useWallet from "./useWallet";
import useFetchStakingData from "./useFetchStakingData";
import usePancakeQuery from "./usePancakeQuery";

export default function useFetchState() {
  const { account } = useWallet();

  const { enqueueSnackbar } = useSnackbar();

  // token available
  const phbToken = usePHB();
  const hznToken = useHZN();
  // const lpToken = useLP();

  // price
  const { run: fetchHZNPrice } = usePancakeQuery();

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
    try {
      setLoading(true);
      const [phb, hzn] = await Promise.all([
        account && phbToken ? phbToken.balanceOf(account) : constants.Zero,
        account && hznToken
          ? hznToken.transferableSynthetix(account)
          : constants.Zero,
        fetchPHBStakingData(),
        fetchHZNStakingData(),
        fetchHZNPrice(),
      ]);

      setAvailablePHB(phb);
      setAvailableHZN(hzn);
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Failed to loading balances", { variant: "error" });
    }
    setLoading(false);
  }, [
    account,
    phbToken,
    hznToken,
    setLoading,
    fetchPHBStakingData,
    fetchHZNStakingData,
    fetchHZNPrice,
    setAvailablePHB,
    setAvailableHZN,
    enqueueSnackbar,
  ]);

  return fetchBalances;
}
