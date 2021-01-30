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
import { SUPPORTED_WALLET_ENUM, SUPPORTED_WALLETS } from "./helper";

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

interface WalletsDialogProps extends DialogProps {
  onSelectWallet?: (key: SUPPORTED_WALLET_ENUM, injection: string) => void;
}

export default function WalletsDialog({
  onSelectWallet,
  ...props
}: WalletsDialogProps) {
  const classes = useStyles();

  return (
    <Dialog {...props}>
      <DialogTitle disableTypography classes={{ root: classes.title }}>
        <span className={classes.titleText}>Connect to a wallet</span>
        <IconButton
          color='primary'
          onClick={(e) => props.onClose?.(e, "backdropClick")}
          classes={{ root: classes.closeIcon }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <List component='nav'>
          {SUPPORTED_WALLETS.map(({ key, label, logo, injection }) => (
            <ListItem
              key={key}
              button
              classes={{ root: classes.item }}
              onClick={() => onSelectWallet?.(key, injection)}
            >
              <ListItemIcon>
                <img src={logo} alt={label} className={classes.logo} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
