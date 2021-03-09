import { useCallback } from "react";
import { Box, Button, InputBase, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import { BigNumber } from "ethers";
import PrimaryButton from "@components/PrimaryButton";
import { getFullDisplayBalance } from "@utils/formatters";

const useStyles = makeStyles(({ palette }) => ({
  root: {},
  inputBox: {
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    border: `1px solid ${palette.divider}`,
    overflow: "hidden",
  },
  token: {
    padding: 12,
    display: " inline-flex",
    alignItems: "center",
  },
  logo: {
    height: 22,
    marginRight: 8,
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
  maxLabelBox: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  maxLabel: {
    fontSize: 10,
    fontWeight: 700,
  },
}));

interface Props {
  token: TokenEnum;
  input?: string;
  onInput: (v: string) => void;
  amount: BigNumber; // ehter BN format of input
  max: BigNumber;
  lockDownSeconds: BigNumber | null;
  btnLabel: string;
  logo?: string;
  loading: boolean;
  onSubmit: () => void;
}

export default function AmountInput({
  token,
  input,
  onInput,
  amount,
  max,
  lockDownSeconds,
  btnLabel,
  logo,
  loading = false,
  onSubmit,
}: Props) {
  const classes = useStyles();

  const setMax = useCallback(() => {
    onInput(getFullDisplayBalance(max));
  }, [max, onInput]);

  return (
    <Box className={classes.root}>
      <Box className={classes.inputBox}>
        <span className={classes.token}>
          {logo ? <img src={logo} alt={""} className={classes.logo} /> : null}
          <Typography>{token}</Typography>
        </span>
        <InputBase
          value={input}
          onChange={(e) => onInput(e.target.value)}
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
      <Box className={classes.maxLabelBox}>
        <Typography
          variant='overline'
          color='textSecondary'
          className={classes.maxLabel}
        >
          {lockDownSeconds && `Lockdown: ${lockDownSeconds.toNumber()} s`}
        </Typography>
        <Typography
          variant='overline'
          color={amount.gt(max) ? "error" : "primary"}
          className={classes.maxLabel}
        >
          {getFullDisplayBalance(max)} Available
        </Typography>
      </Box>
      <PrimaryButton
        size='large'
        fullWidth
        disabled={amount.lte(0) || amount.gt(max)}
        onClick={onSubmit}
        loading={loading}
      >
        {btnLabel}
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
