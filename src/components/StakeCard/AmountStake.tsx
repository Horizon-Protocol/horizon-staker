import { useCallback, useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import BigNumber from "bignumber.js";
import AmountInput from "./AmountInput";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    padding: "20px 16px",
    backgroundColor: "rgba(28,57,95,0.25)",
  },
  amountBox: {
    display: "flex",
    alignItems: "center",
  },
  amount: {
    flex: 1,
    overflow: "hidden",
  },
  buttons: {
    flex: "0 0 120px",
    display: "flex",
    justifyContent: "space-between",
    color: palette.text.primary,
  },
  inputBox: {
    padding: "20px 16px",
  },
}));

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

const InputButton = withStyles(({ palette }) => ({
  root: {
    width: 50,
    minWidth: 50,
    fontWeight: 700,
    color: palette.text.primary,
  },
}))(Button);

interface Props {
  symbol: "phb" | "hzn" | "bnb-lp";
  amount: BigNumber;
}

export default function AmountStake({ symbol, amount }: Props) {
  const classes = useStyles();
  const [lastClick, setLastClick] = useState<"+" | "-">();

  const handleIncrease: React.MouseEventHandler = useCallback((e) => {
    setLastClick("+");
  }, []);

  const handleDecrease: React.MouseEventHandler = useCallback((e) => {
    setLastClick("-");
  }, []);

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.amountBox}>
          <Box className={classes.amount}>
            <AmountLabel variant='caption' color='primary'>
              HZN EARNED
            </AmountLabel>
            <Amount variant='body1'>{amount.toFormat(2)}</Amount>
          </Box>
          <Box className={classes.buttons}>
            <InputButton
              variant='contained'
              color={lastClick === "+" ? "primary" : "secondary"}
              size='small'
              onClick={handleIncrease}
            >
              +
            </InputButton>
            <InputButton
              variant='contained'
              color={lastClick === "-" ? "primary" : "secondary"}
              size='small'
              onClick={handleDecrease}
            >
              -
            </InputButton>
          </Box>
        </Box>
      </Box>
      <Box className={classes.inputBox}>
        <AmountInput symbol={symbol} maxAmount={amount} />
      </Box>
    </>
  );
}
