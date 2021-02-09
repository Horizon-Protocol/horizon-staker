import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { cardContent } from "@utils/theme/common";
import PrimaryButton from "@components/PrimaryButton";
import useBalanceState from "@states/balance";
import { Token } from "@utils/constants";
import { getFullDisplayBalance } from "@utils/formatters";

const useStyles = makeStyles({
  root: {
    ...cardContent,
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
  token: TokenEnum;
  onHarvest?: () => void;
}

export default function Earned({ token, onHarvest }: Props) {
  const classes = useStyles();

  const { earned } = useBalanceState();

  const amount = earned[token].get();

  return (
    <Box className={classes.root}>
      <Box className={classes.amount}>
        <AmountLabel variant='caption' color='primary'>
          HZN EARNED
        </AmountLabel>
        <Amount variant='body1'>{getFullDisplayBalance(amount)}</Amount>
      </Box>
      <PrimaryButton size='large' disabled={amount.lte(0)} onClick={onHarvest}>
        Harvest
      </PrimaryButton>
    </Box>
  );
}
