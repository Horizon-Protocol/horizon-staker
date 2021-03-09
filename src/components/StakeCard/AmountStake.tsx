import { useCallback, useState, useMemo } from "react";
import { BigNumber, constants, utils } from "ethers";
import { Box, Button, Collapse, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { StakingAddresses } from "@utils/constants";
import { cardContent } from "@utils/theme/common";
import useBalancePolling from "@hooks/useBalancePolling";
import { useTokenAllowance } from "@hooks/useAllowance";
import useStaking from "@hooks/useStaking";
import PrimaryButton from "@components/PrimaryButton";
import RoundStart from "@components/RoundStart";
import {
  availableAtomFamily,
  stakedAtomFamily,
  withdrawableAtomFamily,
} from "@atoms/balance";
import { tokenStatAtomFamily } from "@atoms/stat";
import { getFullDisplayBalance } from "@utils/formatters";
import AmountInput from "./AmountInput";
import { useAtomValue } from "jotai/utils";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    ...cardContent,
    minHeight: 54,
  },
  amountBox: {
    display: "flex",
    alignItems: "center",
  },
  staked: {
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
    position: "relative",
    padding: cardContent.padding,
  },
}));

const AmountLabel = withStyles({
  root: {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "1px",
    textTransform: "uppercase",
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
    boxShadow: "none",
  },
}))(Button);

interface Props {
  token: TokenEnum;
  logo?: string;
}

enum Action {
  Stake = 1,
  Unstake,
}

const Actions = [
  {
    key: Action.Stake,
    label: "+",
  },
  {
    key: Action.Unstake,
    label: "-",
  },
];

export default function AmountStake({ token, logo }: Props) {
  const classes = useStyles();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [currentAction, setCurrentAction] = useState<Action>();
  const [input, setInput] = useState<string>();
  const { enqueueSnackbar } = useSnackbar();

  const { refresh } = useBalancePolling();

  const stakingContract = useStaking(token);
  const {
    loading,
    needApprove,
    handleApprove,
    checkApprove,
  } = useTokenAllowance(token, StakingAddresses[token]);

  const available = useAtomValue(availableAtomFamily(token));
  const staked = useAtomValue(stakedAtomFamily(token));
  const withdrawable = useAtomValue(withdrawableAtomFamily(token));

  const { lockDownSeconds } = useAtomValue(tokenStatAtomFamily(token));

  const inputMax: BigNumber = useMemo(() => {
    if (currentAction === Action.Stake) {
      return available;
    } else if (currentAction === Action.Unstake) {
      return withdrawable;
    }
    return constants.Zero;
  }, [currentAction, available, withdrawable]);

  const amount = useMemo(
    () => utils.parseUnits((input || "0").replace(/[^0-9.]/g, "")),
    [input]
  );

  const handleAction: (action: Action) => void = useCallback((action) => {
    setCurrentAction((prevAction) =>
      prevAction === action ? undefined : action
    );
    setInput("0");
  }, []);

  const resetInput = useCallback(() => {
    setSubmitting(false);
    setInput("0");
  }, []);

  const handleStake = useCallback(async () => {
    setSubmitting(true);
    await checkApprove(amount);
    const tx = await stakingContract.stake(amount);
    enqueueSnackbar(
      <>
        Transaction has been sent to blockchain,
        <br />
        waiting for confirmation...
      </>,
      { variant: "info" }
    );
    const res = await tx.wait(1);
    console.log("Stake:", res);
    enqueueSnackbar(
      `Successfully staked ${getFullDisplayBalance(amount)} ${token}`,
      { variant: "success" }
    );
    refresh();
    resetInput();
  }, [
    checkApprove,
    amount,
    stakingContract,
    enqueueSnackbar,
    token,
    refresh,
    resetInput,
  ]);

  const handleUnstake = useCallback(async () => {
    setSubmitting(true);
    const tx = await stakingContract.withdraw(amount);
    enqueueSnackbar(
      <>
        Transaction has been sent to blockchain,
        <br />
        waiting for confirmation...
      </>,
      { variant: "info" }
    );
    const res = await tx.wait(1);
    console.log("Unstake:", res);
    enqueueSnackbar(
      `Successfully unstaked ${getFullDisplayBalance(amount)} ${token}`,
      { variant: "success" }
    );
    refresh();
    resetInput();
  }, [stakingContract, amount, enqueueSnackbar, token, refresh, resetInput]);

  const handleSubmit = useCallback(async () => {
    try {
      if (currentAction && token && stakingContract && amount.gt(0)) {
        if (currentAction === Action.Stake) {
          handleStake();
        } else if (currentAction === Action.Unstake) {
          handleUnstake();
        }
      }
    } catch (e) {
      console.log(e.error);
      enqueueSnackbar(e.error ?? "Operation Failed", { variant: "error" });
    }
  }, [
    currentAction,
    token,
    stakingContract,
    amount,
    handleStake,
    handleUnstake,
    enqueueSnackbar,
  ]);

  return (
    <>
      <Box className={classes.root}>
        {needApprove ? (
          <PrimaryButton
            size='large'
            fullWidth
            loading={loading}
            onClick={handleApprove}
          >
            Approve Contract
          </PrimaryButton>
        ) : (
          <>
            <AmountLabel variant='caption' color='primary'>
              {token} Staked
            </AmountLabel>
            <Box className={classes.amountBox}>
              <Box className={classes.staked}>
                <Amount variant='body1'>{getFullDisplayBalance(staked)}</Amount>
              </Box>
              <Box className={classes.buttons}>
                {Actions.map(({ key, label }) => (
                  <InputButton
                    key={key}
                    variant='contained'
                    color={currentAction === key ? "primary" : "secondary"}
                    size='small'
                    onClick={() => handleAction(key)}
                  >
                    {label}
                  </InputButton>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Collapse in={!!currentAction}>
        <Box className={classes.inputBox}>
          <AmountInput
            token={token}
            logo={logo}
            input={input}
            onInput={setInput}
            amount={amount}
            max={inputMax}
            lockDownSeconds={
              currentAction === Action.Unstake ? lockDownSeconds : null
            }
            btnLabel={currentAction ? Action[currentAction] : ""}
            onSubmit={handleSubmit}
            loading={submitting}
          />
          {currentAction === Action.Stake && <RoundStart token={token} />}
        </Box>
      </Collapse>
    </>
  );
}
