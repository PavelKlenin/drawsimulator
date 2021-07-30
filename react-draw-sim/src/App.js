import { React } from "react";
import s from "./App.module.css";
import "./Components/MainContent/MainContent.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import InputDataContentContainer from "./Components/MainContent/InputDataContent/InputDataContentContainer";
import TeamsContainer from "./Components/MainContent/Teams/TeamsContainer";

const App = () => {
  return (
    <div className={s.container}>
      <Header />
      <main className="main">
        <p className="lg-errors errors">Здесь будут инструкции</p>
        <InputDataContentContainer />
        <TeamsContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
