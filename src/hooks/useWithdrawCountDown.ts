import { Event, EventFilter } from "ethers";
import { useCallback, useEffect } from "react";
import useWallet from "./useWallet";
import useStaking from "./useStaking";

export default function useStakedQuery(token: TokenEnum) {
  const { account } = useWallet();
  const stakingContract = useStaking(token, false);

  const query = useCallback(() => {
    if (account) {
      stakingContract.queryFilter(
        {
          topics: [""],
        },
        account
      );
    }
  }, [account, stakingContract]);

  return query;
}
