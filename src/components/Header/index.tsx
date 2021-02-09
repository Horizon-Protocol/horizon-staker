import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ConnectButton from "@components/ConnectButton";
import WalletButton from "@components/WalletButton";
import logo from "@assets/logo.png";
import useWallet from "@hooks/useWallet";
import { DemoAmount } from "@utils/formatters";
import WalletInfo from "./WalletInfo";

const useStyles = makeStyles({
  container: {
    position: "relative",
    padding: "36px 0",
    borderBottom: "1px solid #11263B",
  },
  logo: {
    height: 40,
  },
  connect: {
    position: "absolute",
    right: 24,
    top: 38,
    fontSize: 14,
    paddingLeft: 18,
    paddingRight: 18,
  },
  walletInfo: {
    position: "absolute",
    right: 24,
    top: 12,
  },
  walletButton: {
    position: "absolute",
    bottom: -16,
  },
});

export default function Header() {
  const classes = useStyles();
  const { connected } = useWallet();

  return (
    <Grid container justify='center' classes={{ container: classes.container }}>
      <img src={logo} alt='Horizon Mintr' className={classes.logo} />
      {connected ? (
        <>
          <WalletInfo className={classes.walletInfo} />
          <WalletButton classes={{ root: classes.walletButton }} />
        </>
      ) : (
        <ConnectButton classes={{ root: classes.connect }} />
      )}
    </Grid>
  );
}
