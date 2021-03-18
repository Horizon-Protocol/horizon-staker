import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAtomValue } from "jotai/utils";
import { cardContent } from "@utils/theme/common";
import { TokenShortName } from "@utils/constants";
import { getFullDisplayBalance, calculateAPY } from "@utils/formatters";
import { tokenStatAtomFamily } from "@atoms/stat";
import { useMemo } from "react";
import { tokenPriceAtomFamily } from "@/atoms/price";

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

  const price = useAtomValue(tokenPriceAtomFamily(token));
  const { total } = useAtomValue(tokenStatAtomFamily(token));

  const apy = useMemo(() => {
    return 0;
    // return calculateAPY();
  }, [price, total]);

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
          {apy ? `${apy * 100} %` : "- -"}
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
