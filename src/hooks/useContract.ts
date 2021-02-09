import { useState, useEffect } from "react";
import { Contract, ContractInterface } from "ethers";
import erc20Abi from "@utils/abis/erc20.json";
import useWallet from "@hooks/useWallet";
import { Addresses, Token } from "@utils/constants";

const useContract = (address: string, abi: ContractInterface) => {
  const { provider } = useWallet();
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    if (provider) {
      setContract(new Contract(address, abi, provider));
    }
  }, [address, abi, provider]);

  return contract;
};

export const useERC20 = (address: string) => {
  return useContract(address, erc20Abi);
};

export const usePHB = () => {
  return useERC20(Addresses[Token.PHB]);
};

export const useHZN = () => {
  return useERC20(Addresses[Token.HZN]);
};

export default useContract;
