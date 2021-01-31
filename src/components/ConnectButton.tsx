import { Button, ButtonProps } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useWalletState } from "@states/wallet";

const StyledButton = withStyles(({ palette }) => ({
  root: {
    fontWeight: 700,
    height: 32,
    borderRadius: 16,
    color: palette.text.primary,
    textTransform: "none",
  },
}))(Button);

export default function ConnectButton(props: ButtonProps) {
  const { open } = useWalletState();

  return (
    <StyledButton
      variant='contained'
      color='primary'
      size='small'
      onClick={() => open.set(true)}
      {...props}
    >
      Connect Wallet
    </StyledButton>
  );
}
