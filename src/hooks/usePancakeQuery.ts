import { useEffect } from "react";
import { useUpdateAtom } from "jotai/utils";
import { useManualQuery } from "graphql-hooks";
import { tokenPriceAtomFamily } from "@atoms/price";
import { Token } from "@/utils/constants";

// import { TOKEN_CONTRACT_ADDRESS } from "@utils/constants";

// const HZN_ADDRESS = TOKEN_CONTRACT_ADDRESS[97].HZN;

// use PanCake price for testing
const CAKE_ADDRESS = "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82";

export const HZN_PRICE_QUERY = `
  bundle(
    id: "1"
  ) {
    id
    ethPrice
  },
  token(
    id: "${CAKE_ADDRESS}"
  ) {
    id
    symbol
    derivedETH
  }
`;

export default function usePancakeQuery() {
  const setPrice = useUpdateAtom(tokenPriceAtomFamily(Token.HZN));

  const [run, { loading, data, error }] = useManualQuery(HZN_PRICE_QUERY);

  useEffect(() => {
    console.log("pancake", { data, error });
    // setPrice(data)
  }, [data, error]);

  return {
    run,
    loading,
    data,
    error,
  };
}
