import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { providers, utils } from "ethers";
import { useWallet as useBscWallet } from "@binance-chain/bsc-use-wallet";
import { ChainName } from "@utils/constants";
import { formatAddress } from "@utils/formatters";

const PHBFilter = {
  address: "0x171B2B6B6Efc088E3D77a3F5Cc1E0F9C9301F9dD",
  topics: [utils.id("Transfer(address,address,uint256)")],
};

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

  const provider = useMemo(
    () =>
      wallet.ethereum && wallet.chainId
        ? new providers.Web3Provider(wallet.ethereum, {
            name: ChainName,
            chainId: wallet.chainId,
          })
        : null,
    [wallet.ethereum, wallet.chainId]
  );

  useEffect(() => {
    // error
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
  }, [wallet.error]);

  // useEffect(() => {
  //   if (provider) {
  //     provider.on(PHBFilter, (log, event) => {
  //       console.log(log, event);
  //     });
  //     provider.on("block", (blockNumber) => {
  //       provider
  //         .getBalance("0xf718d89efa5362a36b898aa0cdf6a1d925a4b243")
  //         .then((res) => {
  //           console.log("PHB:", res.toString());
  //         });
  //     });
  //     return () => {
  //       provider.removeAllListeners();
  //     };
  //   }
  // }, [provider]);

  return {
    ...wallet,
    connecting,
    connected,
    shortAccount,
    provider,
    ChainName,
  };
}
