import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { Avatar, Chip, ChipProps, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { openAtom, detailAtom } from "@atoms/wallet";
import { loadingAvailableAtom } from "@atoms/loading";
import { ChainName } from "@utils/constants";

const StyledChip = withStyles(({ palette }) => ({
  root: {
    paddingLeft: 8,
    paddingRight: 8,
    color: palette.text.primary,
    textTransform: "none",
    borderRadius: 24,
    backgroundColor: "#0A171F",
    border: "1px solid #11263B",
  },
}))(Chip);

const StyledAvatar = withStyles(({ palette }) => ({
  img: {
    width: 18,
    height: 18,
    objectFit: "contain",
  },
}))(Avatar);

export default function WalletIndicator(props: ChipProps) {
  const setOpen = useUpdateAtom(openAtom);
  const wallet = useAtomValue(detailAtom);
  const loading = useAtomValue(loadingAvailableAtom);

  if (!wallet) {
    return null;
  }

  return (
    // <Tooltip title='refresh' placement='top'>
    <StyledChip
      variant='outlined'
      avatar={
        loading ? (
          <CircularProgress color='primary' size={20} />
        ) : (
          <StyledAvatar
            variant='circular'
            src={wallet.logo}
            alt={wallet.label}
          />
        )
      }
      label={ChainName}
      onClick={() => setOpen(true)}
      {...props}
    />
    // </Tooltip>
  );
}
