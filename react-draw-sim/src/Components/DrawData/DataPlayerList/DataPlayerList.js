import { React } from "react";
import "../DrawData.scss";

const DataPlayerList = (props) => {
  const playerList = props.playerList.map((player) => {
    return (
      <p
        className={`player ${player.subs ? "subsPlayer" : ""} ${
          player.repeated ? "repeated" : ""
        }`}
        key={player.id}>
        {player.name}
      </p>
    );
  });

  return (
    <div className="playerDiv">
      <p className="errors">{props.error}</p>
      {props.playerList ? playerList : null}
    </div>
  );
};

export default DataPlayerList;
