import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "@assets/logo.png";

const useStyles = makeStyles({
  container: {
    padding: "42px 0",
    borderBottom: "1px solid #11263B",
  },
  logo: {
    height: 40,
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <Grid container justify='center' classes={{ container: classes.container }}>
      <img src={logo} alt='Horizon Mintr' className={classes.logo} />
    </Grid>
  );
}
