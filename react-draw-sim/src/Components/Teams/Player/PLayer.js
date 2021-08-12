import { React } from 'react';
import "../Teams.scss";

const Player = (props) => {
  return (
    <p className="newPlayer">{props.name}</p>
  )
}

export default Player;

