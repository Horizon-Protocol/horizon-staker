import {
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogProps,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import {
  SUPPORTED_WALLET_ENUM,
  SUPPORTED_WALLETS,
  Wallet,
} from "@utils/constants";
import { useWalletState } from "@states/wallet";

const useStyles = makeStyles(({ palette, typography }) => ({
  title: {
    minWidth: 350,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    ...typography.h6,
  },
  closeIcon: {
    padding: 4,
  },
  item: {
    marginBottom: 12,
    borderRadius: 6,
    "&:hover": {
      background: "rgba(52,129,183,0.1)",
    },
  },
  logo: {
    width: 40,
    height: 40,
  },
}));

export default function WalletsDialog(
  props: Omit<DialogProps, "open" | "onClose">
) {
  const classes = useStyles();
  const { open, merge } = useWalletState();

  const handleClose = () => {
    open.set(false);
  };

  const handleSelectWallet = (wallet: Wallet) => {
    merge({ detail: wallet, open: false });
  };

  return (
    <Dialog open={open.get()} onClose={handleClose} {...props}>
      <DialogTitle disableTypography classes={{ root: classes.title }}>
        <span className={classes.titleText}>Connect to a wallet</span>
        <IconButton
          color='primary'
          onClick={handleClose}
          classes={{ root: classes.closeIcon }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <List component='nav'>
          {SUPPORTED_WALLETS.map((wallet) => (
            <ListItem
              key={wallet.key}
              button
              classes={{ root: classes.item }}
              onClick={() => handleSelectWallet(wallet)}
            >
              <ListItemIcon>
                <img
                  src={wallet.logo}
                  alt={wallet.label}
                  className={classes.logo}
                />
              </ListItemIcon>
              <ListItemText primary={wallet.label} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
