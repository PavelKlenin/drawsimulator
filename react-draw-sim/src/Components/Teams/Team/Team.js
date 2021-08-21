import { useRef, useEffect, React } from "react";
import TeamPlayer from "../TeamPlayer/TeamPlayer";
import "../Teams.scss";

const Team = (props) => {
  const team = useRef();
  // В данном случае не важно, true или false. При любой смене будет происходить прокрутка к командам.
  // Смена просиходит только при нажатии кнопки деления
  useEffect(() => {
    team.current.scrollIntoView();
  }, [props.teamScroll]);

  const changeTeamColor = () => {
    props.changeTeamColor(props.teamId);
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
        </h3>
      )}
      {props.squad.map((player) => {
        return <TeamPlayer key={player.id} name={player.name} />;
      })}
    </div>
  );
};

export default Team;
