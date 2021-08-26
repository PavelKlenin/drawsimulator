import { useRef, useEffect, useState, React } from "react";
import TeamPlayer from "../TeamPlayer/TeamPlayer";
import "../Teams.scss";
import InfoIcon from "./../../common/InfoIcon";

const Team = (props) => {
  const [clicked, setClicked] = useState(false);

  // Тут не важно, true или false. При любом изменении props.teamScroll будет
  // происходить прокрутка к командам; props.teamScroll меняется только при делении
  const team = useRef();
  useEffect(() => {
    team.current.scrollIntoView();
  }, [props.teamScroll]);

  const changeTeamColor = () => {
    props.changeTeamColor(props.teamId);
    setClicked(true);
  };

  return (
    <div className="newTeam" ref={team}>
      {props.isSub ? (
        <h3 className="teamName">{props.title}</h3>
      ) : (
        <h3
          onClick={changeTeamColor}
          className={`teamName basicTeam ${props.color ? props.color : ""}`}>
          {props.title}
          {!clicked && props.teamId === 1 ? (
            <InfoIcon tipName={props.tipName} />
          ) : (
            ""
          )}
        </h3>
      )}
      {props.squad.map((player) => {
        return <TeamPlayer key={player.id} name={player.name} />;
      })}
    </div>
  );
};

export default Team;
