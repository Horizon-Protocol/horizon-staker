import { Button, ButtonProps } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useWalletState } from "@states/wallet";
import { ChainName } from "@utils/constants";

const StyledButton = withStyles(({ palette }) => ({
  root: {
    height: 30,
    color: palette.text.primary,
    textTransform: "none",
    borderRadius: 24,
    backgroundColor: "#0A171F",
    border: "1px solid #11263B",
  },
}))(Button);

const useStyles = makeStyles({
  icon: {
    width: 20,
    height: 20,
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
      variant='outlined'
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
      {ChainName}
    </StyledButton>
  );
}
