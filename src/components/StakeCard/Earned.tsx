import { Box, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { cardContent } from "@utils/theme/common";
import PrimaryButton from "@components/PrimaryButton";
import { earnedAtomFamily } from "@atoms/balance";
import { getFullDisplayBalance } from "@utils/formatters";
import { useAtomValue } from "jotai/utils";
import { useCallback } from "react";
import useStaking from "@/hooks/useStaking";

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

  const earned = useAtomValue(earnedAtomFamily(token));

  const stakingContract = useStaking();

  const handleHarvest = useCallback(async () => {
    if (stakingContract) {
      const tx = await stakingContract.getReward();
      console.log(tx);
    }
  }, [stakingContract]);

  return (
    <Box className={classes.root}>
      <Box className={classes.amount}>
        <AmountLabel variant='caption' color='primary'>
          HZN EARNED
        </AmountLabel>
        <Amount variant='body1'>{getFullDisplayBalance(earned)}</Amount>
      </Box>
      <PrimaryButton
        size='large'
        disabled={earned.lte(0)}
        onClick={handleHarvest}
      >
        Harvest
      </PrimaryButton>
    </Box>
  );
}
