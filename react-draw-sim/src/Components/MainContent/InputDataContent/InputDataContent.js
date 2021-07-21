import { React } from "react";
import { inputTextCreator, playersBlurCreator, playersCountCreator, teamBlurCreator } from "../../../store/store";
import "./InputData.css";
import InputReqiuredCount from "./InputRequiredCount/InputReqiuredCount";
import PlayerList from "./PlayerList/PlayerList";
import { teamCountCreator } from "./../../../store/store";

const InputDataContent = (props) => {
  const onInputChange = (e) => {
    props.dispatch(inputTextCreator(e.target.value));
  };

  return (
    <div className="data-content">
      <p className="list-errors sm-errors errors">Здесь будут инструкции</p>
      <textarea
        onChange={onInputChange}
        className="list"
        placeholder="Список участников"></textarea>
      <p className="arrList-errors sm-errors errors">Здесь будут инструкции</p>
      <PlayerList playerList={props.playerList} />
      <p className="condition-errors sm-errors errors">
        Здесь будут инструкции
      </p>
      <div className="conditions">
        <InputReqiuredCount
          className="teamCondition"
          title="Количество команд:"
          inputClassName="teamsCount"
          changeCountCreator={teamCountCreator}
          blurCountCreator={teamBlurCreator}
          maxLength="2"
          value={props.teamsCount}
          dispatch={props.dispatch}
        />
        <InputReqiuredCount
          className="playersCondition"
          title="Количество&nbsp;игроков&nbsp;в&nbsp;команде&nbsp;(max):"
          inputClassName="maxPlayersCount"
          changeCountCreator={playersCountCreator}
          blurCountCreator={playersBlurCreator}
          maxLength="3"
          value={props.playersCount}
          dispatch={props.dispatch}
        />
        <button className="divideBtn btn">Поделить</button>
      </div>
    </div>
  );
};

export default InputDataContent;
