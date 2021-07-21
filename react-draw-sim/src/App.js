import { React } from "react";
import s from "./App.module.css";
import "./Components/MainContent/MainContent.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import InputDataContent from "./Components/MainContent/InputDataContent/InputDataContent";
import Teams from "./Components/MainContent/Teams/Teams";
// import MainContent from "./Components/MainContent/MainContent";

function App(props) {
  return (
    <div className={s.container}>
      <Header />
      <main className="main">
        <p className="lg-errors errors">Здесь будут инструкции</p>
        <InputDataContent
          playerList={props.state.playerList}
          teamsCount={props.state.teamsCount}
          playersCount={props.state.playersCount}
          dispatch={props.dispatch}
        />
        <Teams />
      </main>
      <Footer />
    </div>
  );
}

export default App;
