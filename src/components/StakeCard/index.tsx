import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Link,
} from "@material-ui/core";
import BigNumber from "bignumber.js";
import { Token } from "@utils/constants";
import { useWalletState } from "@/states/wallet";
import ExternalLink from "@components/ExternalLink";
import phbBg from "@assets/phb.png";
import binanceLogo from "@assets/exchanges/binance.png";
import ConnectButton from "../ConnectButton";
import Stats from "./Stats";
import Earned from "./Earned";
import AmountStake from "./AmountStake";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 14,
  },
  desc: {
    color: "#C1D3E0",
    fontSize: "14px",
    lineHeight: "22px",
  },
}));

const defaultAmount = new BigNumber("123456789000.12345683833");

const StyledCard = withStyles(({ palette }) => ({
  root: {
    width: 340,
    borderRadius: 20,
    backgroundColor: "transparent",
    backgroundRepeat: "no-repeat",
    backgroundSize: "360px 240px",
    backgroundPosition: "top -56px right -84px",
    backgroundImage: `url(${phbBg})`,
    border: `1px solid ${palette.divider}`,
  },
}))(Card);

const StyledHeader = withStyles({
  root: {
    paddingTop: 32,
    backgroundColor: "rgba(28,57,95,0.25)",
  },
  title: {
    marginBottom: 8,
  },
})(CardHeader);

const StyledContent = withStyles(() => ({
  root: {
    padding: 0,
    backgroundColor: "rgba(12,17,29,0.5)",
  },
}))(CardContent);

const StyledActions = withStyles(({ palette }) => ({
  root: {
    backgroundColor: "rgba(28,57,95,0.25)",
    borderTop: `1px solid ${palette.divider}`,
  },
}))(CardActions);

export default function StakeCard() {
  const classes = useStyles();
  const { detail } = useWalletState();

  const connected = true; //!!detail.get();

  return (
    <StyledCard variant='outlined'>
      <StyledHeader
        title='Stake PHB'
        subheader={
          <Typography className={classes.desc} color='textSecondary'>
            Stake BEP-20 PHB to earn HZN. <br />
            To convert your existing PHX or BEP-2 PHB to BEP-20 PHB, click{" "}
            <Link href='https://horizonprotocol.com'>here</Link>.
          </Typography>
        }
      />
      <StyledContent>
        <Stats />
        <Earned amount={defaultAmount} />
        {!connected && <ConnectButton fullWidth rounded size='large' />}
        {connected && <AmountStake token={Token.PHB} staked={defaultAmount} />}
      </StyledContent>
      <StyledActions>
        <ExternalLink href='https://binance.com' logo={binanceLogo}>
          Buy PHB
        </ExternalLink>
      </StyledActions>
    </StyledCard>
  );
}
