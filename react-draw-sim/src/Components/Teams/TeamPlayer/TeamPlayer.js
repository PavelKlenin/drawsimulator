import { React } from 'react';
import "../Teams.scss";

const TeamPlayer = (props) => {
  return (
    <p className="newPlayer">{props.name}</p>
  )
}

export default TeamPlayer;

