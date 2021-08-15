import { connect } from "react-redux";
import { changeTeamColorAC } from "../../store/actions";
import Teams from "./Teams";

const mapStateToProps = (state) => {
  return {
    teams: state.reducer.teams,
  };
};

const mapDispatchToProps = {
  changeTeamColorAC,
};

const TeamsContainer = connect(mapStateToProps, mapDispatchToProps)(Teams);

export default TeamsContainer;
