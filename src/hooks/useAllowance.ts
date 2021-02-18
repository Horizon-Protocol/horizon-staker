import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { BigNumber } from "ethers";
import { useSnackbar } from "notistack";
import { Erc20 } from "@abis/types";
import { tokenAllowanceAtomFamily } from "@atoms/balance";
import { Token } from "@utils/constants";
import { usePHB, useHZN } from "./useContract";
import useWallet from "./useWallet";

export const useTokenAllowance = (token: TokenEnum, spenderAddress: string) => {
  const { account } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const [allowance, setAllowance] = useAtom(tokenAllowanceAtomFamily(token));

  const phbContract = usePHB(true);
  const hznContract = useHZN(true);

  const tokenContract: Erc20 | null = useMemo(() => {
    switch (token) {
      case Token.HZN:
        return hznContract as Erc20;
      case Token.PHB:
        return phbContract as Erc20;
      default:
        break;
    }
    return null;
  }, [token, phbContract, hznContract]);

  const fetchAllowance = useCallback(async () => {
    if (account && tokenContract) {
      setLoading(true);
      const allowance = await tokenContract.allowance(account, spenderAddress);
      console.log("allowance", token, allowance.toString());
      setAllowance(allowance);
      setLoading(false);
    }
  }, [account, tokenContract, setAllowance, spenderAddress, token]);

  const handleApprove = useCallback(async () => {
    if (token === Token.HZN_BNB_LP) {
      enqueueSnackbar("Coming soon!", { variant: "warning" });
      return;
    }
    if (account && tokenContract) {
      setLoading(true);
      try {
        const total = await tokenContract.totalSupply();
        console.log(total.toString());
        const tx = await tokenContract.approve(spenderAddress, total);
        enqueueSnackbar(
          "Approval request has been sent to blockchain, waiting for confirmation... ",
          { variant: "info" }
        );
        const res = await tx.wait(1);
        console.log("approve", res);
        setAllowance(total);
      } catch (e) {
        enqueueSnackbar(e?.message || "Operation failed"!, {
          variant: "error",
        });
      }
      setLoading(false);
    }
  }, [
    token,
    account,
    tokenContract,
    spenderAddress,
    setAllowance,
    enqueueSnackbar,
  ]);

  const checkApprove = useCallback(
    async (amount: BigNumber) => {
      if (amount.lte(allowance)) {
        console.log("already approved", allowance.toString());
        return;
      }

      handleApprove();
    },
    [allowance, handleApprove]
  );

  useEffect(() => {
    fetchAllowance();
  }, [fetchAllowance]);

  return {
    loading,
    needApprove: allowance.lte(0),
    allowance,
    handleApprove,
    checkApprove,
  };
};
