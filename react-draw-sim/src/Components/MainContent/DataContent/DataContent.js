import { React } from 'react';
import "./DataContent.css";

const DataContent = () => {
  return (
    <div className="data-content">
    <p className="list-errors sm-errors errors">Здесь будут инструкции</p>
    <textarea className="list" placeholder="Список участников"></textarea>
    <p className="arrList-errors sm-errors errors">Здесь будут инструкции</p>
    <div className="playerDiv"></div>
    <p className="condition-errors sm-errors errors">Здесь будут инструкции</p>
    <div className="conditions">
      <div className="teamCondition">
        <span className="conditions_text">Количество команд:</span>
        <input
          className="teamsCount conditions_count"
          type="text"
          maxlength="2"
          value="3"
        />
      </div>
      <div className="playersCondition">
        <span className="conditions_text">
          Количество&nbsp;игроков&nbsp;в&nbsp;команде&nbsp;(max):
        </span>
        <input
          className="maxPlayersCount conditions_count"
          type="text"
          maxlength="3"
          value="5"
        />
      </div>
      <button className="divideBtn btn">Поделить</button>
    </div>
  </div>
  )
}

export default DataContent;
