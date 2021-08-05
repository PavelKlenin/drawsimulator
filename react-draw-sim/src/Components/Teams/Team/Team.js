import { React } from "react";
import Player from "../Player/PLayer";
import "../Teams.css";

const Team = (props) => {
  const changeTeamColor = () => {
    props.changeTeamColor(props.teamId);
  };

  return (
    <div className="newTeam">
      {props.color ? (
        <h3 onClick={changeTeamColor} className="teamName basicTeamName">
          {props.title}
        </h3>
      ) : (
        <h3 className="teamName">{props.title}</h3>
      )}
      {props.squad.map((player) => {
        return <Player key={player.id} name={player.name} />;
      })}
    </div>
  );
};

export default Team;