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
} from "../../../store/reducer";
import DataContent from "./DataContent";

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

const DataContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataContent);

export default DataContentContainer;
