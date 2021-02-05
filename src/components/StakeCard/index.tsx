import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardProps,
  CardHeader,
  CardActions,
  CardContent,
} from "@material-ui/core";
import BigNumber from "bignumber.js";
import defaultTheme from "@utils/theme";
import { useWalletState } from "@states/wallet";
import ExternalLink from "@components/ExternalLink";
import ConnectButton from "../ConnectButton";
import CardSection from "./CardSection";
import Stats from "./Stats";
import Earned from "./Earned";
import AmountStake from "./AmountStake";

const useStyles = makeStyles(() => ({
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
    flex: "0 0 340px",
    borderRadius: 20,
    backgroundColor: "transparent",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto 220px",
    backgroundPosition: "top -56px right -84px",
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

const StyledLinks = withStyles(({ palette }) => ({
  root: {
    padding: 16,
    backgroundColor: "rgba(28,57,95,0.25)",
    borderTop: `1px solid ${palette.divider}`,
  },
}))(CardActions);

interface LinkProps {
  href: string;
  logo: string;
  text: string;
}
export interface RenderConnectedProps {
  token: TokenEnum;
  logo?: string;
  staked: BigNumber;
}

export interface StakeCardProps extends CardProps {
  token: TokenEnum;
  desc: string | React.ReactNode;
  bg: string;
  color?: string;
  logo?: string;
  links?: LinkProps[];
  renderConnected?: (props: RenderConnectedProps) => React.ReactNode;
}

export default function StakeCard({
  token,
  bg,
  color = defaultTheme.palette.primary.main,
  desc,
  logo,
  links,
  renderConnected,
  ...props
}: StakeCardProps) {
  const classes = useStyles();
  const { detail } = useWalletState();

  const connected = !!detail.get();

  return (
    <StyledCard
      variant='outlined'
      style={{
        backgroundImage: `url(${bg})`,
      }}
      {...props}
    >
      <StyledHeader
        title={`Stake ${token}`}
        subheader={
          <Typography className={classes.desc} color='textSecondary'>
            {desc}
          </Typography>
        }
        style={{
          color,
        }}
      />
      <StyledContent>
        <Stats />
        <Earned amount={defaultAmount} />
        {connected ? (
          renderConnected ? (
            renderConnected({ token, logo, staked: defaultAmount })
          ) : (
            <AmountStake logo={logo} token={token} staked={defaultAmount} />
          )
        ) : (
          <CardSection>
            <ConnectButton fullWidth rounded size='large' />
          </CardSection>
        )}
      </StyledContent>
      {links?.length ? (
        <StyledLinks>
          {links.map(({ href, logo, text }) => (
            <ExternalLink key={href} href={href} logo={logo}>
              {text}
            </ExternalLink>
          ))}
        </StyledLinks>
      ) : null}
    </StyledCard>
  );
}
