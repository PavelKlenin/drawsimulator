import { React } from "react";
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
      <div className="countInputsSm">
        <p className="errors"></p>
        <DataCountInput
          className="teamCondition"
          title="Количество команд:"
          inputClassName="teamsCount"
          error={props.error.requiredPlayers}
          onCountChange={props.onTeamCountChangeTC}
          onCountBlur={props.onTeamCountBlurTC}
          toggleFocus={props.toggleTeamsFocusAC}
          maxLength="2"
          value={props.totalTeams}
        />
        <DataCountInput
          className="playersCondition"
          title="Количество&nbsp;игроков&nbsp;в&nbsp;команде&nbsp;(max):"
          inputClassName="maxPlayersCount"
          onCountChange={props.onMaxPlayersChangeTC}
          onCountBlur={props.onMaxPlayersBlurTC}
          maxLength="3"
          value={props.maxPlayersInTeam}
        />
      </div>
      <DataPlayerInput
        isFocused={props.isFocused}
        error={props.error.reqiuredPlayers}
        onInputChangeTC={props.onInputChangeTC}
        onInputBlur={props.onInputBlurTC}
        toggleFocus={props.togglePlayersFocusAC}
        className="list"
        placeholder="Список участников"
      />
      <DataPlayerList
        basketTipName={props.basketTipName}
        error={props.error}
        playerList={props.playerList}
        onPlayerClick={props.onDataPlayerClickTC}
      />
      <div className="conditions">
        <div className="countInputsLg">
          <p className="errors"></p>
          <DataCountInput
            className="teamCondition"
            title="Количество команд:"
            inputClassName="teamsCount"
            error={props.error.requiredPlayers}
            onCountChange={props.onTeamCountChangeTC}
            onCountBlur={props.onTeamCountBlurTC}
            toggleFocus={props.toggleTeamsFocusAC}
            maxLength="2"
            value={props.totalTeams}
          />
          <DataCountInput
            className="playersCondition"
            title="Количество&nbsp;игроков&nbsp;в&nbsp;команде&nbsp;(max):"
            inputClassName="maxPlayersCount"
            onCountChange={props.onMaxPlayersChangeTC}
            onCountBlur={props.onMaxPlayersBlurTC}
            maxLength="3"
            value={props.maxPlayersInTeam}
          />
        </div>
        <DataRandTeamBtn
          className="playersCondition"
          inputClassName="randomToggle"
          title="Поделить в случайном порядке: "
          toggleRandomCreator={props.toggleRandomAC}
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
