import { React } from "react";
// import * as Scroll from "react-scroll";
import "./DrawData.scss";
import DataCountInput from "./DataCountInput/DataCountInput";
import DataPlayerList from "./DataPlayerList/DataPlayerList";
import DataRandTeamBtn from "./DataRandTeamBtn/DataRandTeamBtn";
import DataPlayerInput from "./DataPlayerInput/DataPlayerInput";

const DrawData = (props) => {
  const divideTeams = () => {
    props.divideTeamsTC();
  };
  return (
    <div className="data-content">
      <DataPlayerInput
        error={props.error.notEnoughPlayers}
        onInputChangeTC={props.onInputChangeTC}
        onInputBlurTC={props.onInputBlurTC}
        onInputFocus={props.onInputFocus}
        className="list"
        placeholder="Список участников"
      />
      <DataPlayerList
        error={props.error.repeatedPlayers}
        playerList={props.playerList}
      />
      <div className="conditions">
        <p className="errors"></p>
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
          disabled={!props.isValid}
          onClick={divideTeams}
          className="divideBtn btn">
          Поделить
        </button>
      </div>
    </div>
  );
};

export default DrawData;
