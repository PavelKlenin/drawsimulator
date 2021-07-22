import { React } from "react";
import s from "./App.module.css";
import "./Components/MainContent/MainContent.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import InputDataContentContainer from "./Components/MainContent/InputDataContent/InputDataContentContainer";
import Teams from "./Components/MainContent/Teams/Teams";
// import MainContent from "./Components/MainContent/MainContent";

function App(props) {
  return (
    <div className={s.container}>
      <Header />
      <main className="main">
        <p className="lg-errors errors">Здесь будут инструкции</p>
        <InputDataContentContainer />
        <Teams />
      </main>
      <Footer />
    </div>
  );
}

export default App;
