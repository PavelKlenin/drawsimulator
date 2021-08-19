import { React } from "react";
import DataPlayer from "../DataPlayer/DataPlayer";
import "../DrawData.scss";

const DataPlayerList = (props) => {
  const playerList = props.playerList.map((player) => {
    return (
      <DataPlayer
        {...player}
        error={props.error}
        onPlayerClick={props.onPlayerClick}
      />
    );
  });

  return (
    <div className="playerDiv">
      <p className="errors">
        {props.error.repeatedPlayers.message ||
          props.error.filledBasket.message}
      </p>
      {props.playerList ? playerList : null}
    </div>
  );
};

export default DataPlayerList;
