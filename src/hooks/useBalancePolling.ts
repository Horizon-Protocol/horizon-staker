import { useCallback } from "react";
import useInterval from "@use-it/interval";
import { BigNumber } from "ethers";
import useBalanceState from "@states/balance";
import { Token } from "@utils/constants";
import { usePhb } from "./useContract";
import useWallet from "./useWallet";

export default function useBalancePolling(delay: number = 5000) {
  const { account } = useWallet();
  const phbContract = usePhb();
  const { available } = useBalanceState();

  const fetchBalances = useCallback(async () => {
    if (phbContract) {
      const [phb] = await Promise.all([phbContract.balanceOf(account)]);
      console.log("phb==", phb);
      // available[Token.PHB].set(phb);
    }
  }, [account, phbContract]);

  useInterval(fetchBalances, account ? delay : null);
}
