import { React } from "react";
import s from "./App.module.css";
import "./Components/MainContent/MainContent.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import DataContentContainer from "./Components/MainContent/DataContent/DataContentContainer";
import TeamsContainer from "./Components/MainContent/Teams/TeamsContainer";

const App = () => {
  return (
    <div className={s.container}>
      <Header />
      <main className="main">
        <p className="lg-errors errors">Здесь будут инструкции</p>
        <DataContentContainer />
        <TeamsContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
