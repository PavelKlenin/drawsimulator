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
  togglePlayersFocusAC,
  toggleTeamsFocusAC,
  onDataPlayerClickTC
} from "../../store/actions";
import DrawData from "./DrawData";
import { PLAYER_BASKET_TIP } from '../../store/tooltipReducer';

const mapStateToProps = (state) => {
  return {
    playerList: state.inputDataReducer.playerList,
    totalTeams: state.inputDataReducer.totalTeams,
    maxPlayersInTeam: state.inputDataReducer.maxPlayersInTeam,
    isRandom: state.inputDataReducer.isRandom,
    isFocused: state.inputDataReducer.isFocused,
    teams: state.inputDataReducer.teams,
    isValid: state.errorReducer.isValid,
    error: state.errorReducer.error,
    basketTipName: PLAYER_BASKET_TIP, 
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
  togglePlayersFocusAC,
  toggleTeamsFocusAC,
  onDataPlayerClickTC
};

const DrawDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawData);

export default DrawDataContainer;
