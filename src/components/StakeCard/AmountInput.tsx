import { useCallback, useMemo, useState } from "react";
import { Box, Button, InputBase, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import BigNumber from "bignumber.js";
import PrimaryButton from "@components/PrimaryButton";

const useStyles = makeStyles(({ palette }) => ({
  root: {},
  inputBox: {
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    border: `1px solid ${palette.divider}`,
    overflow: "hidden",
  },
  symbol: {
    padding: 12,
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderLeft: `1px solid ${palette.divider}`,
    fontSize: 24,
  },
  max: {
    fontWeight: 700,
  },
  maxLabel: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 20,
  },
}));

interface Props {
  symbol: string;
  maxAmount: BigNumber;
}

export default function AmountInput({ symbol, maxAmount }: Props) {
  const classes = useStyles();
  const [value, setValue] = useState<string>();

  const amount = useMemo(() => {
    const amount = new BigNumber((value || "0").replace(/,/g, ""));
    return amount;
  }, [value]);

  const setMax = useCallback(() => {
    setValue(maxAmount.toFormat(2));
  }, [maxAmount]);

  const handleStake = useCallback(() => {
    console.log("stake", symbol, value);
  }, [symbol, value]);

  return (
    <Box className={classes.root}>
      <Box className={classes.inputBox}>
        <span className={classes.symbol}>PHB</span>
        <InputBase
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={classes.input}
          placeholder='0.0'
          inputComponent={NumberFormatCustom as any}
        />
        <Button
          variant='text'
          color='primary'
          className={classes.max}
          onClick={setMax}
        >
          Max
        </Button>
      </Box>
      <Typography
        variant='overline'
        color='primary'
        display='block'
        align='right'
        className={classes.maxLabel}
      >
        {maxAmount.toFormat(2)} {symbol} Available
      </Typography>
      <PrimaryButton
        size='large'
        fullWidth
        disabled={amount.lte(0)}
        onClick={handleStake}
      >
        Stake
      </PrimaryButton>
    </Box>
  );
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}
