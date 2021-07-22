import { connect } from "react-redux";
import {
  inputTextCreator,
  playersBlurCreator,
  playersCountCreator,
  teamBlurCreator,
  teamCountCreator,
} from "../../../store/generalReducer";
import InputDataContent from "./InputDataContent";

const mapStateToProps = (state) => {
  return {
    playerList: state.generalReducer.playerList,
    teamsCount: state.generalReducer.teamsCount,
    playersCount: state.generalReducer.playersCount,
  }

};

const mapDispatchToProps = {
  teamCountCreator,
  teamBlurCreator,
  playersCountCreator,
  playersBlurCreator,
  inputTextCreator,
};

const InputDataContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputDataContent);

export default InputDataContentContainer;
