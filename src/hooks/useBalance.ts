import { useEffect, useState } from "react";
import { utils } from "ethers";
import useWallet from "./useWallet";

export default function useBalance() {
  const [state, setState] = useState({});
  const { provider } = useWallet();

  return {};
}
