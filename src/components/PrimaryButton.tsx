import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const PrimaryButton = withStyles(({ palette }) => ({
  root: {
    flex: "0 0 120px",
    fontWeight: 700,
    color: palette.text.primary,
    borderRadius: "6px",
    background: "linear-gradient(180deg, #64B7DC 0%, #3785B9 100%)",
    boxShadow: "0 4px 12px 0 #050C11",
    letterSpacing: "0.88px",
    "&:hover": {
      background: "linear-gradient(180deg, #477e97 0%, #25597c 100%)",
    },
    "&:disabled": {
      color: "rgba(251, 251, 251, 0.2)",
      background: "rgba(52,129,183,0.1)",
    },
  },
}))(Button);

export default PrimaryButton;
