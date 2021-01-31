import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {},
  item: {
    padding: "4px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  apy: {
    fontWeight: 700,
  },
});

export default function Earned() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <div className={classes.item}>
        <Typography variant='body1' color='primary'>
          APY
        </Typography>
        <Typography variant='body1' classes={{ root: classes.apy }}>
          250%
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography variant='body1' color='primary'>
          Total Staked
        </Typography>
        <Typography variant='body1'>1,343,948,855 PHB</Typography>
      </div>
    </Box>
  );
}
