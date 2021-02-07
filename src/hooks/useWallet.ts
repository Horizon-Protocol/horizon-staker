import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useWallet } from "@binance-chain/bsc-use-wallet";

export default function useBscWallet() {
  const wallet = useWallet();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  console.log(wallet);

  useEffect(() => {
    if (wallet.error) {
      switch (wallet.error.name) {
        case "ChainUnsupportedError":
          break;
        case "ConnectorUnsupportedError":
          break;
        case "ConnectionRejectedError":
          break;
        case "ConnectorConfigError":
          break;
        default:
          break;
      }
      enqueueSnackbar(wallet.error.name);
    }
  }, [wallet.error, enqueueSnackbar]);

  return wallet;
}
