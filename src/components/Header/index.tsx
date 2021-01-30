import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ConnectWallet from "@components/ConnectWallet";
import logo from "@assets/logo.png";

const useStyles = makeStyles({
  container: {
    position: "relative",
    padding: "42px 0",
    borderBottom: "1px solid #11263B",
  },
  logo: {
    height: 40,
  },
  connect: {
    position: "absolute",
    right: 24,
    top: 42,
    fontSize: 14,
    paddingLeft: 18,
    paddingRight: 18,
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <Grid container justify='center' classes={{ container: classes.container }}>
      <img src={logo} alt='Horizon Mintr' className={classes.logo} />
      <ConnectWallet classes={{ root: classes.connect }} />
    </Grid>
  );
}
