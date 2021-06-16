import { React } from "react";
import DataContent from "./DataContent/DataContent";
import Teams from "./Teams/Teams";
import "./MainContent.css";

const MainContent = () => {
  return (
    <main className="main">
      <p className="lg-errors errors">Здесь будут инструкции</p>
      <DataContent />
      <Teams />
    </main>
  );
};

export default MainContent;
