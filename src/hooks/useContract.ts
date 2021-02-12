import { useState, useEffect } from "react";
import { Contract, ContractInterface } from "ethers";
import erc20Abi from "@abis/erc20.json";
import { Erc20 } from "@abis/types";
import useWallet from "@hooks/useWallet";
import { Addresses, Token } from "@utils/constants";

const useContract = (
  address: string,
  abi: ContractInterface,
  writable: boolean = false
) => {
  const { provider } = useWallet();
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    if (provider) {
      if (writable) {
        setContract(new Contract(address, abi, provider.getSigner()));
      } else {
        setContract(new Contract(address, abi, provider));
      }
    }
  }, [address, abi, provider, writable]);

  return contract;
};

export const useERC20 = (address: string, writable: boolean = false) => {
  return useContract(address, erc20Abi, writable) as Erc20;
};

export const usePHB = (writable: boolean = false) => {
  return useERC20(Addresses[Token.PHB], writable);
};

export const useHZN = (writable: boolean = false) => {
  return useERC20(Addresses[Token.HZN], writable);
};

export default useContract;
