import { useState } from "react";
import { Button, ButtonProps } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import WalletsDialog from "./WalletsDialog";
import { SUPPORTED_WALLET_ENUM } from "./helper";

const ConnectButton = withStyles(({ palette }) => ({
  root: {
    height: 32,
    borderRadius: 16,
    color: palette.text.primary,
  },
}))(Button);

export default function ConnectWallet(props: ButtonProps) {
  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSelectWallet = (
    key: SUPPORTED_WALLET_ENUM,
    injection: string
  ) => {
    console.log(key, injection);
  };

  return (
    <>
      <ConnectButton
        variant='contained'
        color='primary'
        size='small'
        onClick={handleOpen}
        {...props}
      >
        Connect Wallet
      </ConnectButton>
      <WalletsDialog
        open={open}
        onClose={handleClose}
        onSelectWallet={handleSelectWallet}
      />
    </>
  );
}
