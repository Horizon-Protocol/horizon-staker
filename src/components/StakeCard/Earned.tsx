import { useAtomValue } from "jotai/utils";
import { useCallback, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { useCountUp } from "use-count-up";
import { cardContent } from "@utils/theme/common";
import useBalancePolling from "@hooks/useBalancePolling";
import PrimaryButton from "@components/PrimaryButton";
import { earnedAtomFamily } from "@atoms/balance";
import {
  formatNumber,
  getBalanceNumber,
  getFullDisplayBalance,
} from "@utils/formatters";
import useStaking from "@hooks/useStaking";

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
}

export default function Earned({ token }: Props) {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  const { refresh } = useBalancePolling();
  const earned = useAtomValue(earnedAtomFamily(token));

  const stakingContract = useStaking(token);

  const { value: earnedCount } = useCountUp({
    isCounting: true,
    start: 0,
    end: getBalanceNumber(earned),
    duration: 2,
    formatter: (v) =>
      formatNumber(v, {
        mantissa: 2,
      }),
  });

  const handleHarvest = useCallback(async () => {
    if (stakingContract) {
      try {
        setLoading(true);
        const tx = await stakingContract.getReward();
        enqueueSnackbar(
          <>
            Transaction has been sent to blockchain,
            <br />
            waiting for confirmation...
          </>,
          { variant: "info" }
        );
        const res = await tx.wait(1);
        console.log("Harvest:", res);
        enqueueSnackbar(
          `Successfully harvested ${getFullDisplayBalance(earned, {
            mantissa: 2,
          })} HZN`,
          { variant: "success" }
        );
        refresh();
      } catch (e) {
        console.log(e.error);
        enqueueSnackbar(e.error ?? "Operation Failed", { variant: "error" });
      }
      setLoading(false);
    }
  }, [earned, enqueueSnackbar, refresh, stakingContract]);

  return (
    <Box className={classes.root}>
      <Box className={classes.amount}>
        <AmountLabel variant='caption' color='primary'>
          HZN EARNED
        </AmountLabel>
        <Amount variant='body1'>{earnedCount}</Amount>
      </Box>
      <PrimaryButton
        loading={loading}
        size='large'
        disabled={earned.lte(0)}
        onClick={handleHarvest}
      >
        Harvest
      </PrimaryButton>
    </Box>
  );
}
