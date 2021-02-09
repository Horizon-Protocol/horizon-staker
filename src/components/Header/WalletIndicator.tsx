import { Avatar, Chip, ChipProps, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import useWalletState from "@states/wallet";
import useBalanceState from "@states/balance";
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
const StyledCircularProgress = withStyles(({ palette }) => ({
  svg: {
    width: 20,
    height: 20,
  },
}))(CircularProgress);

const StyledAvatar = withStyles(({ palette }) => ({
  img: {
    width: 18,
    height: 18,
    objectFit: "contain",
  },
}))(Avatar);

export default function WalletIndicator(props: ChipProps) {
  const { open, detail } = useWalletState();
  const { loading } = useBalanceState();

  const detailData = detail.get();

  if (!detailData) {
    return null;
  }

  return (
    // <Tooltip title='refresh' placement='top'>
    <StyledChip
      variant='outlined'
      avatar={
        loading.get() ? (
          <StyledCircularProgress color='primary' size={24} />
        ) : (
          <StyledAvatar
            variant='circle'
            src={detailData.logo}
            alt={detailData.label}
          />
        )
      }
      label={ChainName}
      onClick={() => open.set(true)}
      {...props}
    />
    // </Tooltip>
  );
}
