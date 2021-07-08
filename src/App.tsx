import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import WalletsDialog from "@components/WalletsDialog";
import Header from "@components/Header";
import Home from "./Home";
import "./App.css";

const COMMIT_VERSION = process.env.REACT_APP_COMMIT_VERSION;

const Version = withStyles(() => ({
  root: {
    position: "absolute",
    right: 12,
    bottom: 0,
    color: "#666",
  },
}))(Typography);

ReactGA.initialize("UA-199967475-1", {
  // debug: true,
});
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
    <>
      <div className='App'>
        <Header />
        <Home />
        {COMMIT_VERSION ? (
          <Version variant='caption'>Version: {COMMIT_VERSION}</Version>
        ) : null}
      </div>
      <WalletsDialog />
    </>
  );
}

export default App;
