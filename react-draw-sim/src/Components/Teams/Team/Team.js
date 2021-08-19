import { React } from "react";
import TeamPlayer from "../TeamPlayer/TeamPlayer";
import "../Teams.scss";

const Team = (props) => {
  const changeTeamColor = () => {
    props.changeTeamColor(props.teamId);
  };
  return (
    <div className="newTeam">
      {props.isSub ? (
        <h3 className="teamName">{props.title}</h3>
      ) : (
        <h3
          onClick={changeTeamColor}
          className={`teamName basicTeam ${props.color ? props.color : ""}`}>
          {props.title}
        </h3>
      )}
      {props.squad.map((player) => {
        return <TeamPlayer key={player.id} name={player.name} />;
      })}
    </div>
  );
};

export default Team;
