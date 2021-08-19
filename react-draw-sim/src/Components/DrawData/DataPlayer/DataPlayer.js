import { React } from "react";
import "../DrawData.scss";

const DataPlayer = (props) => {
  const onPlayerClick = () => {
    !error && props.onPlayerClick(props.id);
  };

  const error = props.error.repeatedPlayers.isValid ? false : true;

  return (
    <p
      className={`player ${props.subs || error ? "disabledPlayer" : ""} ${
        props.repeated || props.overflowed ? "errorPlayer" : ""
      }`}
      key={props.id}
      onClick={onPlayerClick}>
      {props.name}
      {props.basket > 0 && (
        <span className={`basket basket${props.basket}`}>{props.basket}</span>
      )}
    </p>
  );
};

export default DataPlayer;
