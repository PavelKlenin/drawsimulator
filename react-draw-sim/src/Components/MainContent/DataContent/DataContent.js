import { React } from "react";
import * as Scroll from 'react-scroll';
import "./DataContent.css";
import DataCountInput from "./DataCountInput/DataCountInput";
import PlayerList from "./PlayerList/PlayerList";
import RandomTeamToggle from "./RandomTeamToggle";

const DataContent = (props) => {
  const onInputChange = (e) => {
    props.inputTextCreator(e.target.value);
    props.updateSubsCreator();
  };

  const divideTeams = () => {
    props.divideTeamsCreator();
    Scroll.scroller.scrollTo("teams", {
      smooth: true,
    })
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
        <DataCountInput
          className="teamCondition"
          title="Количество команд:"
          inputClassName="teamsCount"
          changeCountCreator={props.teamCountCreator}
          blurCountCreator={props.teamBlurCreator}
          updateSubsCreator={props.updateSubsCreator}
          maxLength="2"
          value={props.teamsCount}
          dispatch={props.dispatch}
        />
        <DataCountInput
          className="playersCondition"
          title="Количество&nbsp;игроков&nbsp;в&nbsp;команде&nbsp;(max):"
          inputClassName="maxPlayersCount"
          changeCountCreator={props.playersCountCreator}
          blurCountCreator={props.playersBlurCreator}
          updateSubsCreator={props.updateSubsCreator}
          maxLength="3"
          value={props.playersCount}
          dispatch={props.dispatch}
        />
        <RandomTeamToggle
          className="playersCondition"
          inputClassName="randomToggle"
          title="Поделить в случайном порядке: "
          toggleRandomCreator={props.toggleRandomCreator}
          isRandom={props.isRandom}
        />
        <button onClick={divideTeams} className="divideBtn btn">
          Поделить
        </button>
      </div>
    </div>
  );
};

export default DataContent;
