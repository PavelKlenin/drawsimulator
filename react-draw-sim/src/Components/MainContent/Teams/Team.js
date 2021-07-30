import { React } from 'react';
import Player from './PLayer';
import "./Teams.css";

const Team = (props) => {
  return (
    <div className="newTeam">
      <h3 className="teamName">{props.title}</h3>
      {props.squad.map(player => {
        return <Player key={player.id} name={player.name} />
      })}
    </div>
  )
}

export default Team;

