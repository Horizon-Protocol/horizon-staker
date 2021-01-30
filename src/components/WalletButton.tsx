import { Button, ButtonProps } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useWalletState } from "@states/wallet";

const StyledButton = withStyles(({ palette }) => ({
  root: {
    height: 32,
    borderRadius: 16,
    color: palette.text.primary,
  },
}))(Button);

const useStyles = makeStyles({
  icon: {
    width: 24,
    height: 24,
  },
});

export default function WalletButton(props: ButtonProps) {
  const classes = useStyles();
  const { open, detail } = useWalletState();

  const detailData = detail.get();
  if (!detailData) {
    return null;
  }

  return (
    <StyledButton
      variant='contained'
      color='primary'
      size='small'
      onClick={() => open.set(true)}
      startIcon={
        <img
          src={detailData.logo}
          alt={detailData.label}
          className={classes.icon}
        />
      }
      {...props}
    >
      {detailData.label}
    </StyledButton>
  );
}
