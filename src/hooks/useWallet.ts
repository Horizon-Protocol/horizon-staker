import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { useWallet as useBscWallet } from "@binance-chain/bsc-use-wallet";
import { formatAddress } from "@utils/formatters";

export default function useWallet() {
  const wallet = useBscWallet();

  const { enqueueSnackbar } = useSnackbar();

  const shortAccount = useMemo(
    () => (wallet.account ? formatAddress(wallet.account) : ""),
    [wallet.account]
  );
  const { connecting, connected } = useMemo(
    () => ({
      connecting: wallet.status === "connecting",
      connected: wallet.status === "connected",
    }),
    [wallet.status]
  );

  useEffect(() => {
    if (wallet.error) {
      let errorMsg = "Failed to connect wallet";
      switch (wallet.error.name) {
        case "ChainUnsupportedError":
          errorMsg = "Chain Unsupported Error";
          break;
        case "ConnectorUnsupportedError":
          errorMsg = "Connector Unsupported Error";
          break;
        case "ConnectionRejectedError":
          errorMsg = "Connection Rejected Error";
          break;
        case "ConnectorConfigError":
          errorMsg = "Connector Config Error";
          break;
        default:
          break;
      }
      enqueueSnackbar(errorMsg, { variant: "error" });
    }
  }, [wallet.error, enqueueSnackbar]);

  console.log({ ...wallet, shortAccount });
  return { ...wallet, connecting, connected, shortAccount };
}
