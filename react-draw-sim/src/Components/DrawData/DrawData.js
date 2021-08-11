import { React } from "react";
import * as Scroll from "react-scroll";
import "./DrawData.css";
import DataCountInput from "./DataCountInput/DataCountInput";
import DataPlayerList from "./DataPlayerList/DataPlayerList";
import DataRandTeamBtn from "./DataRandTeamBtn/DataRandTeamBtn";

const DrawData = (props) => {
  const onInputChange = (e) => {
    props.onInputChangeTC(e.target.value);
  };

  const onInputBlur = () => {
    props.onInputBlurTC();
  }

  const onInputFocus = () => {
    props.onInputFocus();
  }

  const divideTeams = () => {
    props.divideTeamsTC();
    //! Исправить
    Scroll.scroller.scrollTo("teams", {
      smooth: true,
    });
  };

  return (
    <div className="data-content">
      {props.error.notEnoughPlayers && (
        <p className="listErrors  errors">
          {props.error.notEnoughPlayers}
        </p> // className = smErrors
      )}
      <textarea
        onChange={onInputChange}
        onBlur={onInputBlur}
        onFocus={onInputFocus}
        className="list"
        placeholder="Список участников"></textarea>
      {props.error.repeatedPlayers && (
        <p className="arrListErrors errors">
          {props.error.repeatedPlayers}
        </p> // className = smErrors
      )}
      <DataPlayerList playerList={props.playerList} />
      <div className="conditions">
        <DataCountInput
          className="teamCondition"
          title="Количество команд:"
          inputClassName="teamsCount"
          changeCountCreator={props.onTeamCountChangeTC}
          blurCountCreator={props.onTeamCountBlurTC}
          onFocus={props.resetEnoughPlayers}
          maxLength="2"
          value={props.teamsCount}
          dispatch={props.dispatch}
        />
        <DataCountInput
          className="playersCondition"
          title="Количество&nbsp;игроков&nbsp;в&nbsp;команде&nbsp;(max):"
          inputClassName="maxPlayersCount"
          changeCountCreator={props.onMaxPlayersChangeTC}
          blurCountCreator={props.onMaxPlayersBlurTC}
          maxLength="3"
          value={props.maxPlayersCount}
          dispatch={props.dispatch}
        />
        <DataRandTeamBtn
          className="playersCondition"
          inputClassName="randomToggle"
          title="Поделить в случайном порядке: "
          toggleRandomCreator={props.toggleRandomCreator}
          isRandom={props.isRandom}
        />
        <button
          disabled={props.error.required}
          onClick={divideTeams}
          className="divideBtn btn">
          Поделить
        </button>
      </div>
    </div>
  );
};

export default DrawData;
