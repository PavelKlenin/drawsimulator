import { React } from "react";
import "../DrawData.css";

const DataPlayerList = (props) => {
  const playerList = props.playerList.map((player) => {
    return (
      <p
        className={player.subs ? "player subsPlayer" : "player"}
        key={player.id}>
        {player.name}
      </p>
    );
  });

  return (
    <div className="playerDiv">{props.playerList ? playerList : null}</div>
  );
};

export default DataPlayerList;
