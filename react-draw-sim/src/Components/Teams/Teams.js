import { useRef, useEffect } from "react";
import { React } from "react";
import Team from "./Team/Team";
import "./Teams.scss";

const Teams = (props) => {
  const teams = useRef();
  useEffect(() => {
    teams.current.scrollIntoView();
  },[props.teams])
  return (
    <div className="teams" id="teams" ref={teams}>
      {props.teams &&
        props.teams.map((team) => {
          return (
            <Team
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
