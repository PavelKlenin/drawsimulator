import { connect } from "react-redux";
import { changeTeamColorAC } from "../../store/actions";
import { TEAM_COLOR_TIP } from "../../store/tooltipReducer";
import Teams from "./Teams";

const mapStateToProps = (state) => {
  return {
    teams: state.teamsReducer.teams,
    teamScroll: state.teamsReducer.teamScroll,
    teamTipName: TEAM_COLOR_TIP,
  };
};

const mapDispatchToProps = {
  changeTeamColorAC,
};

const TeamsContainer = connect(mapStateToProps, mapDispatchToProps)(Teams);

export default TeamsContainer;
