import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { providers } from "ethers";
import { useWallet as useBscWallet } from "@binance-chain/bsc-use-wallet";
import { CHAIN_NAME_MAP } from "@utils/constants";
import { formatAddress } from "@utils/formatters";

export default function useWallet() {
  const wallet = useBscWallet<providers.ExternalProvider>();

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

  const chainName = useMemo(
    () => (wallet.chainId ? CHAIN_NAME_MAP[wallet.chainId] : ""),
    [wallet.chainId]
  );

  const provider = useMemo(
    () =>
      wallet.ethereum && wallet.chainId
        ? new providers.Web3Provider(wallet.ethereum, {
            name: chainName,
            chainId: wallet.chainId,
          })
        : null,
    [wallet.ethereum, wallet.chainId, chainName]
  );

  console.log("provider", provider);
  return {
    ...wallet,
    connecting,
    connected,
    shortAccount,
    provider,
    chainName,
  };
}
