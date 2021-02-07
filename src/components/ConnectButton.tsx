import { Button, ButtonProps } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useWalletState } from "@states/wallet";

interface Props extends ButtonProps {
  rounded?: boolean;
}

const StyledButton = withStyles(({ palette }) => ({
  root: {
    fontWeight: 700,
    borderRadius: 16,
    color: palette.text.primary,
  },
}))(Button);

const useStyles = makeStyles({
  rounded: {
    borderRadius: "6px",
    background: "linear-gradient(180deg, #64B7DC 0%, #3785B9 100%)",
    boxShadow: "0 4px 12px 0 #050C11",
    "&:hover": {
      background: "linear-gradient(180deg, #477e97 0%, #25597c 100%)",
    },
  },
});

export default function ConnectButton({ rounded, ...props }: Props) {
  const classes = useStyles();

  const { open } = useWalletState();

  return (
    <StyledButton
      variant='contained'
      color='primary'
      size='small'
      onClick={() => open.set(true)}
      {...props}
      className={rounded ? classes.rounded : ""}
    >
      Connect Wallet
    </StyledButton>
  );
}
