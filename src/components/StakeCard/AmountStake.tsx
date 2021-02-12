import { useCallback, useState, useMemo } from "react";
import { BigNumber, constants, utils } from "ethers";
import { Box, Button, Collapse, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { STAKING_CONTRACT_ADDRESS } from "@utils/constants";
import { cardContent } from "@utils/theme/common";
import { useTokenAllowance } from "@hooks/useAllowance";
import useStaking from "@hooks/useStaking";
import { Staking } from "@/abis/types";
import {
  availableAtomFamily,
  stakedAtomFamily,
  withdrawableAtomFamily,
} from "@atoms/balance";
import { getFullDisplayBalance } from "@utils/formatters";
import AmountInput from "./AmountInput";
import { useAtomValue } from "jotai/utils";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    ...cardContent,
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
  const [currentAction, setCurrentAction] = useState<Action>();
  const [input, setInput] = useState<string>();
  const { enqueueSnackbar } = useSnackbar();

  const stakingContract = useStaking();
  const { checkApprove } = useTokenAllowance(token, STAKING_CONTRACT_ADDRESS);

  const available = useAtomValue(availableAtomFamily(token));
  const staked = useAtomValue(stakedAtomFamily(token));
  const withdrawable = useAtomValue(withdrawableAtomFamily(token));

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
  }, []);

  const handleStake = useCallback(async () => {
    await checkApprove(amount);
    const tx = await (stakingContract as Staking).stake(amount);
    console.log("tx:", tx);
    enqueueSnackbar(
      `Successfully staked ${getFullDisplayBalance(amount)} ${token}`,
      { variant: "success" }
    );
  }, [token, checkApprove, stakingContract, amount, enqueueSnackbar]);

  const handleUnstake = useCallback(async () => {
    const tx = await (stakingContract as Staking).withdraw(amount);
    console.log("tx:", tx);
    enqueueSnackbar(
      `Successfully unstaked ${getFullDisplayBalance(amount)} ${token}`,
      { variant: "success" }
    );
  }, [token, stakingContract, amount, enqueueSnackbar]);

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
            btnLabel={currentAction ? Action[currentAction] : ""}
            onSubmit={handleSubmit}
          />
        </Box>
      </Collapse>
    </>
  );
}
