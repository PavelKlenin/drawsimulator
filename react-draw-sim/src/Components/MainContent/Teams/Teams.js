import { React } from 'react';
import Team from './Team';
import "./Teams.css";

const Teams = (props) => {
  return (
    <div className="teams" id="teams">
      {props.teams && props.teams.map(team => {
        return <Team key={team.id} title={team.name} squad={team.squad} /> 
      })}
    </div>
  )
}

export default Teams;

