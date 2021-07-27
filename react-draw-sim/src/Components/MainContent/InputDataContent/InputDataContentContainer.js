import { connect } from "react-redux";
import {
  divideTeamsCreator,
  inputTextCreator,
  playersBlurCreator,
  playersCountCreator,
  teamBlurCreator,
  teamCountCreator,
  updateSubsCreator,
} from "../../../store/generalReducer";
import InputDataContent from "./InputDataContent";

const mapStateToProps = (state) => {
  return {
    playerList: state.generalReducer.playerList,
    teamsCount: state.generalReducer.teamsCount,
    playersCount: state.generalReducer.playersCount,
    isRandom: state.generalReducer.isRandom,
    teams: state.generalReducer.teams,
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
};

const InputDataContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputDataContent);

export default InputDataContentContainer;
