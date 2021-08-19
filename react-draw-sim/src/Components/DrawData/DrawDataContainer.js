import { connect } from "react-redux";
import {
  divideTeamsTC,
  onMaxPlayersChangeTC,
  onMaxPlayersBlurTC,
  onTeamCountChangeTC,
  onTeamCountBlurTC,
  toggleRandomAC,
  onInputChangeTC,
  onInputBlurTC,
  onInputFocus,
  resetNotEnoughErrMsgAC,
  onDataPlayerClickTC
} from "../../store/actions";
import DrawData from "./DrawData";

const mapStateToProps = (state) => {
  return {
    playerList: state.inputDataReducer.playerList,
    totalTeams: state.inputDataReducer.totalTeams,
    maxPlayersInTeam: state.inputDataReducer.maxPlayersInTeam,
    isRandom: state.inputDataReducer.isRandom,
    teams: state.inputDataReducer.teams,
    isValid: state.errorReducer.isValid,
    error: state.errorReducer.error,
  }

};

const mapDispatchToProps = {
  onTeamCountChangeTC,
  onTeamCountBlurTC,
  onMaxPlayersChangeTC,
  onMaxPlayersBlurTC,
  divideTeamsTC,
  toggleRandomAC,
  onInputChangeTC,
  onInputBlurTC,
  onInputFocus,
  resetNotEnoughErrMsgAC,
  onDataPlayerClickTC
};

const DrawDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawData);

export default DrawDataContainer;
