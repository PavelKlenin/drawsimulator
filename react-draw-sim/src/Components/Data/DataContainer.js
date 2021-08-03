import { connect } from "react-redux";
import {
  divideTeamsCreator,
  inputTextCreator,
  playersBlurCreator,
  playersCountCreator,
  teamBlurCreator,
  teamCountCreator,
  updateSubsCreator,
  toggleRandomCreator
} from "../../store/reducer";
import Data from "./Data";

const mapStateToProps = (state) => {
  return {
    playerList: state.reducer.playerList,
    teamsCount: state.reducer.teamsCount,
    playersCount: state.reducer.playersCount,
    isRandom: state.reducer.isRandom,
    teams: state.reducer.teams,
  }

};

const mapDispatchToProps = {
  teamCountCreator,
  teamBlurCreator,
  playersCountCreator,
  playersBlurCreator,
  inputTextCreator,
  updateSubsCreator,
  divideTeamsCreator,
  toggleRandomCreator,
};

const DataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Data);

export default DataContainer;
