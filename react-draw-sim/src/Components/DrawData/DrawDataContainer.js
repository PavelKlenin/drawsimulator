import { connect } from "react-redux";
import {
  divideTeamsTC,
  onMaxPlayersChangeTC,
  onMaxPlayersBlurTC,
  onTeamCountChangeTC,
  onTeamCountBlurTC,
  toggleRandomCreator,
  onInputChangeTC,
  onInputBlurTC,
  onInputFocus,
  resetEnoughPlayers
} from "../../store/reducer";
import DrawData from "./DrawData";

const mapStateToProps = (state) => {
  return {
    playerList: state.reducer.playerList,
    teamsCount: state.reducer.teamsCount,
    maxPlayersCount: state.reducer.maxPlayersCount,
    isRandom: state.reducer.isRandom,
    teams: state.reducer.teams,
    isValid: state.reducer.isValid,
    error: state.reducer.error,
  }

};

const mapDispatchToProps = {
  onTeamCountChangeTC,
  onTeamCountBlurTC,
  onMaxPlayersChangeTC,
  onMaxPlayersBlurTC,
  divideTeamsTC,
  toggleRandomCreator,
  onInputChangeTC,
  onInputBlurTC,
  onInputFocus,
  resetEnoughPlayers
};

const DrawDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawData);

export default DrawDataContainer;
