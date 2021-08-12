import { React } from "react";
// import s from "./App.module.css";
import "./App.scss";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import DrawDataContainer from "./Components/DrawData/DrawDataContainer";
import TeamsContainer from "./Components/Teams/TeamsContainer";

const App = () => {
  return (
    <div className="container" >
      <Header />
      <main className="main" >
        <DrawDataContainer />
        <TeamsContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
