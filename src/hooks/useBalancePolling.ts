import { useCallback } from "react";
import useInterval from "@use-it/interval";
import useBalanceState from "@states/balance";
import { Token } from "@utils/constants";
import { usePHB, useHZN } from "./useContract";
import useWallet from "./useWallet";

export default function useBalancePolling(delay: number = 5000) {
  const { account } = useWallet();
  const phbContract = usePHB();
  const hznContract = useHZN();
  const { available } = useBalanceState();

  const fetchBalances = useCallback(async () => {
    if (phbContract && hznContract) {
      const [phb, hzn] = await Promise.all([
        phbContract.balanceOf(account),
        hznContract.balanceOf(account),
      ]);
      available.merge({
        [Token.PHB]: phb,
        [Token.HZN]: hzn,
      });
    }
  }, [account, phbContract, hznContract]);

  useInterval(fetchBalances, account ? delay : null);
}
