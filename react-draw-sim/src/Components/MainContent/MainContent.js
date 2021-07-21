import { React } from "react";
import InputData from "./InputData/InputData";
import Teams from "./Teams/Teams";
import "./MainContent.css";

const MainContent = () => {
  return (
    <main className="main">
      <p className="lg-errors errors">Здесь будут инструкции</p>
      <InputData />
      <Teams />
    </main>
  );
};

export default MainContent;
