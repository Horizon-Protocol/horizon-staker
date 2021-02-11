import { useCallback } from "react";
import { Box, Button, InputBase, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import { BigNumber } from "ethers";
import PrimaryButton from "@components/PrimaryButton";
import { STAKING_CONTRACT_ADDRESS } from "@utils/constants";
import { getFullDisplayBalance } from "@utils/formatters";
import { useTokenAllowance } from "@hooks/useAllowance";
import useStaking from "@hooks/useStaking";
import { Staking } from "@/abis/types";
import { useSnackbar } from "notistack";

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
  maxLabel: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 20,
  },
}));

interface Props {
  token: TokenEnum;
  input?: string;
  onInput: (v: string) => void;
  amount: BigNumber; // ehter BN format of input
  max: BigNumber;
  btnLabel: string;
  logo?: string;
}

export default function AmountInput({
  token,
  input,
  onInput,
  amount,
  max,
  btnLabel,
  logo,
}: Props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const stakingContract = useStaking();
  const { checkApprove } = useTokenAllowance(token, STAKING_CONTRACT_ADDRESS);

  const setMax = useCallback(() => {
    onInput(getFullDisplayBalance(max));
  }, [max, onInput]);

  const handleStake = useCallback(async () => {
    try {
      await checkApprove(amount);
      if (token && stakingContract && amount.gt(0)) {
        const res = await (stakingContract as Staking).stake(amount);
        console.log("stake results:", res);
        enqueueSnackbar(
          `Successfully staked ${getFullDisplayBalance(amount)} ${token}`,
          { variant: "success" }
        );
      }
    } catch (e) {
      console.log(e.error);
      enqueueSnackbar(e.error ?? "Operation Failed", { variant: "error" });
    }
  }, [token, checkApprove, stakingContract, amount, enqueueSnackbar]);

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
      <Typography
        variant='overline'
        color='primary'
        display='block'
        align='right'
        className={classes.maxLabel}
      >
        {getFullDisplayBalance(max)} {token} Available
      </Typography>
      <PrimaryButton
        size='large'
        fullWidth
        disabled={amount.lte(0) || amount.gt(max)}
        onClick={handleStake}
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
