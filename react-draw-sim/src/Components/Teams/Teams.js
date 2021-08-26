import { React } from "react";
import Team from "./Team/Team";
import "./Teams.scss";

const Teams = (props) => {
  return (
    <div className="teams" id="teams">
      {props.teams &&
        props.teams.map((team) => {
          return (
            <Team
              tipName={props.teamTipName}
              teamScroll={props.teamScroll}
              key={team.id}
              {...team}
              teamId={team.id}
              id="teams"
              changeTeamColor={props.changeTeamColorAC}
            />
          );
        })}
    </div>
  );
};

export default Teams;
