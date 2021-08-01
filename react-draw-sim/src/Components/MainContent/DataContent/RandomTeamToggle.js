import { React } from "react";
import "./DataContent.css";

const RandomTeamToggle = (props) => {
  const toggleRandom = () => {
    // props.toggleRandomCreator(e.target.checked); // для checkbox
    props.toggleRandomCreator(); // для div
  };
  return (
    <div className={props.className}>
      <span className="conditions_text">{props.title}</span>
      <div onClick={toggleRandom} className={`${props.inputClassName} conditions_count`}>
        {props.isRandom && <div className="checked"></div> }
      </div>
    </div>
  );
};

export default RandomTeamToggle;
