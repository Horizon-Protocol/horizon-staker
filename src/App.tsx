import WalletsDialog from "@components/WalletsDialog";
import Header from "@components/Header";
import Home from "./Home";
import "./App.css";

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
