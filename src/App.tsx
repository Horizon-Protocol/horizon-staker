import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import WalletsDialog from "@components/WalletsDialog";
import Header from "@components/Header";
import Home from "./Home";
import "./App.css";

const COMMIT_TIME = process.env.REACT_APP_COMMIT_TIME;

const UpdateTimestamp = withStyles(() => ({
  root: {
    position: "absolute",
    right: 12,
    bottom: 0,
    color: "#666",
  },
}))(Typography);

function App() {
  return (
    <>
      <div className='App'>
        <Header />
        <Home />
        {COMMIT_TIME ? (
          <UpdateTimestamp variant='caption'>
            Version: {COMMIT_TIME}
          </UpdateTimestamp>
        ) : null}
      </div>
      <WalletsDialog />
    </>
  );
}

export default App;
