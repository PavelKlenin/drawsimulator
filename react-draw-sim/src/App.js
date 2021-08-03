import { React } from "react";
// import s from "./App.module.css";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import DataContainer from "./Components/Data/DataContainer";
import TeamsContainer from "./Components/Teams/TeamsContainer";

const App = () => {
  return (
    <div className="container" >
      <Header />
      <main className="main" >
        <p className="errors lgErrors" >Здесь будут инструкции</p>
        <DataContainer />
        <TeamsContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
