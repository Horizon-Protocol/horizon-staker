import useBalanceState from "@/states/balance";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { cardContent } from "@utils/theme/common";
import { TokenShortName } from "@utils/constants";
import { getFullDisplayBalance } from "@utils/formatters";

const useStyles = makeStyles({
  root: {
    padding: cardContent.padding,
  },
  item: {
    padding: "4px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
  },
  apy: {
    fontSize: 14,
    fontWeight: 700,
  },
  total: {
    fontSize: 14,
  },
});

export default function Stats({ token }: { token: TokenEnum }) {
  const classes = useStyles();

  const { stats } = useBalanceState();

  const { apy, total } = stats[token].get();

  return (
    <Box className={classes.root}>
      <div className={classes.item}>
        <Typography
          variant='body1'
          color='primary'
          classes={{ root: classes.label }}
        >
          APY
        </Typography>
        <Typography variant='body1' classes={{ root: classes.apy }}>
          {apy * 100} %
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography
          variant='body1'
          color='primary'
          classes={{ root: classes.label }}
        >
          Total Staked
        </Typography>
        <Typography variant='body1' classes={{ root: classes.total }}>
          {getFullDisplayBalance(total)} {TokenShortName[token]}
        </Typography>
      </div>
    </Box>
  );
}
