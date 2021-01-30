import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#62B5DB",
    },
    secondary: {
      main: "rgba(98,181,219,0.1)",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#C1D3E0",
    },
    background: {
      default: "#120C1C",
      paper: "#0D2130",
    },
    divider: "#11263B",
  },
});

export default theme;
