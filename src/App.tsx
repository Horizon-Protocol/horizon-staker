import BigNumber from "bignumber.js";
import WalletsDialog from "@components/WalletsDialog";
import Header from "@components/Header";
import Home from "./Home";
import "./App.css";

BigNumber.config({
  FORMAT: {
    prefix: "",
    decimalSeparator: ".",
    groupSeparator: ",",
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: " ",
    fractionGroupSize: 0,
    suffix: "",
  },
});

function App() {
  return (
    <>
      <div className='App'>
        <Header />
        <Home />
      </div>
      <WalletsDialog />
    </>
  );
}

export default App;
