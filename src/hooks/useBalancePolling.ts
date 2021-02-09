import { useCallback } from "react";
import useInterval from "@use-it/interval";
import { BigNumber, constants } from "ethers";
import { useSnackbar } from "notistack";
import useBalanceState from "@states/balance";
import { Token } from "@utils/constants";
import { usePHB, useHZN } from "./useContract";
import useWallet from "./useWallet";

export default function useBalancePolling(delay: number = 10000) {
  const { account } = useWallet();
  const phbContract = usePHB();
  const hznContract = useHZN();
  const { loading, available } = useBalanceState();

  const { enqueueSnackbar } = useSnackbar();

  const fetchBalances = useCallback(async () => {
    if (phbContract && hznContract) {
      loading.set(true);
      try {
        const [phb, hzn] = await Promise.all([
          phbContract.balanceOf(account),
          hznContract.balanceOf(account),
        ]);
        available.merge({
          [Token.PHB]: phb as BigNumber,
          [Token.HZN]: hzn as BigNumber,
        });
      } catch (e) {
        enqueueSnackbar("Failed to loading balances", { variant: "error" });
      }
      loading.set(false);
    }
  }, [account, phbContract, hznContract]);

  useInterval(fetchBalances, account ? delay : null);
}
