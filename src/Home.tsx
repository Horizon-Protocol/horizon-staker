import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import StakeCard, { StakeCardProps } from "@components/StakeCard";
import { Token } from "@utils/constants";
import useBalancePolling from "@hooks/useBalancePolling";
import phbBg from "@assets/bgs/phb.png";
import hznBg from "@assets/bgs/hzn.png";
import bnbBg from "@assets/bgs/bnb.png";
import phbLogo from "@assets/tokens/phb.png";
import bnbLogo from "@assets/tokens/bnb.png";
import cakeLogo from "@assets/tokens/cake.png";

const useStyles = makeStyles({
  container: {
    padding: "6vh 24px 24px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    margin: 10,
  },
});

const cards: StakeCardProps[] = [
  {
    token: Token.PHB,
    bg: phbBg,
    color: "#FC4C07",
    logo: phbLogo,
    links: [
      {
        href: "https://binance.com",
        logo: bnbLogo,
        text: "Buy PHB",
      },
    ],
    desc: (
      <>
        Stake BEP-20 PHB to earn HZN. <br />
        To convert your existing PHX or BEP-2 PHB to BEP-20 PHB, click{" "}
        <Link href='https://horizonprotocol.com' target='_blank'>
          here
        </Link>
        .
      </>
    ),
  },
  {
    token: Token.HZN,
    bg: hznBg,
    desc: (
      <>
        Stake BEP-20 HZN to earn HZN. <br />
        To convert your ERC-20 HZN to BEP-20 HZN, click{" "}
        <Link href='https://horizonprotocol.com' target='_blank'>
          here
        </Link>
        .
      </>
    ),
    links: [
      // {
      //   href: "https://binance.com",
      //   logo: bnbLogo,
      //   text: "Buy HZN",
      // },
      {
        href: "https://exchange.pancakeswap.finance/",
        logo: cakeLogo,
        text: "Buy HZN",
      },
    ],
  },
  {
    token: Token.HZN_BNB_LP,
    bg: bnbBg,
    color: "#D2884F",
    desc: (
      <>
        Stake HZN-BNB LPs to earn HZN. <br />
        You can provide liquidity on Pancakeswap to get HZN-BNB LP tokens.
      </>
    ),
    links: [
      {
        href: "https://exchange.pancakeswap.finance/",
        logo: cakeLogo,
        text: "Buy GET HZN-BNB LP TOKENS",
      },
    ],
  },
];

export default function Home() {
  const classes = useStyles();

  useBalancePolling();

  return (
    <div className={classes.container}>
      {cards.map((card) => (
        <StakeCard key={card.token} {...card} className={classes.card} />
      ))}
    </div>
  );
}
