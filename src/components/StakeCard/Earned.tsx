import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import BigNumber from "bignumber.js";
import PrimaryButton from "@components/PrimaryButton";

const useStyles = makeStyles({
  root: {
    padding: "20px 16px",
    backgroundColor: "rgba(28,57,95,0.25)",
    display: "flex",
    alignItems: "center",
  },
  amount: {
    flex: 1,
    overflow: "hidden",
  },
});

const AmountLabel = withStyles({
  root: {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "1px",
  },
})(Typography);

const Amount = withStyles({
  root: {
    paddingRight: 8,
    fontSize: 22,
    letterSpacing: "1.71px",
    fontWeight: 500,
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
})(Typography);

interface Props {
  amount: BigNumber;
  onHarvest?: () => void;
}

export default function Earned({ amount, onHarvest }: Props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.amount}>
        <AmountLabel variant='caption' color='primary'>
          HZN EARNED
        </AmountLabel>
        <Amount variant='body1'>{amount.toFormat(2)}</Amount>
      </Box>
      <PrimaryButton size='large' disabled={amount.lte(0)} onClick={onHarvest}>
        Harvest
      </PrimaryButton>
    </Box>
  );
}
