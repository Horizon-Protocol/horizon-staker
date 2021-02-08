import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";
import "fontsource-roboto";
import { UseWalletProvider } from "@binance-chain/bsc-use-wallet";
import theme from "@utils/theme";
import { ChainId } from "@utils/constants";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        preventDuplicate
      >
        <UseWalletProvider chainId={ChainId}>
          <App />
        </UseWalletProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
