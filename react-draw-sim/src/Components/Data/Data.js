import { React } from "react";
import * as Scroll from 'react-scroll';
import "./Data.css";
import DataCountInput from "./DataCountInput/DataCountInput";
import DataPlayerList from "./DataPlayerList/DataPlayerList";
import DataRandTeamBtn from "./DataRandTeamBtn/DataRandTeamBtn";

const Data = (props) => {
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
      <p className="listErrors smErrors errors">Здесь будут инструкции</p>
      <textarea
        onChange={onInputChange}
        className="list"
        placeholder="Список участников"></textarea>
      <p className="arrListErrors smErrors errors">Здесь будут инструкции</p>
      <DataPlayerList playerList={props.playerList} />
      <p className="conditionErrors smErrors errors">
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
        <DataRandTeamBtn
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

export default Data;
