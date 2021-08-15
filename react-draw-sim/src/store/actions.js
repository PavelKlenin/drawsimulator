import * as CONST from './consts';

export const inputTextCreator = (text) => {
	return { type: CONST.ON_INPUT_TEXT, value: text };
};
export const teamCountCreator = (count) => {
  return { type: CONST.CHANGE_TEAMS_COUNT, value: count };
};
export const maxPlayersCountCreator = (count) => {
  return { type: CONST.CHANGE_MAX_PLAYERS_COUNT, value: count };
};
export const minPlayersCountCreator = (count) => {
  return { type: CONST.CHANGE_MIN_PLAYERS_COUNT, value: count };
};
export const teamBlurCreator = (count) => {
  return { type: CONST.BLUR_TEAMS_COUNT, value: count };
};
export const maxPlayersBlurCreator = (count) => {
  return { type: CONST.BLUR_MAX_PLAYERS_COUNT, value: count };
};
export const minPlayersBlurCreator = (count) => {
  return { type: CONST.BLUR_MIN_PLAYERS_COUNT, value: count };
};
export const updateSubsCreator = () => {
  return { type: CONST.UPDATE_SUBS };
};
export const divideTeamsCreator = () => {
  return { type: CONST.DIVIDE_TEAMS };
};
export const changeTeamColorCreator = (teamId) => {
  return { type: CONST.CHANGE_TEAM_COLOR, teamId };
};
export const toggleRandomCreator = () => {
  return { type: CONST.TOGGLE_RANDOM };
};
export const validateInputs = () => {
  return { type: CONST.VALIDATE };
};
export const checkRepeatedPlayers = () => {
  return { type: CONST.CHECK_REPEATED_PLAYERS };
};
export const setRepeatedErrMsg = () => {
  return { type: CONST.SET_REPEATED_ERR_MSG };
};
export const resetRepeatedPlayers = () => {
  return { type: CONST.RESET_REPEATED_PLAYERS };
};
export const checkRequired = (text) => {
  return { type: CONST.REQUIRED, text };
};
export const resetRequired = () => {
  return { type: CONST.RESET_REQUIRED };
};
export const checkEnoughPlayers = () => {
  return { type: CONST.CHECK_ENOUGH_PLAYERS };
};
export const setNotEnoughErrMsg = () => {
  return { type: CONST.SET_NOT_ENOUGH_ERR_MSG };
};
export const resetEnoughPlayers = () => {
  return { type: CONST.RESET_ENOUGH_PLAYERS };
};

//* ThunkCreators
export const onInputChangeTC = (text) => (dispatch) => {
  dispatch(inputTextCreator(text));
  dispatch(updateSubsCreator());
  dispatch(checkRequired(text));
  dispatch(checkEnoughPlayers());
  dispatch(checkRepeatedPlayers());
  dispatch(validateInputs());
};
export const onInputBlurTC = () => (dispatch) => {
  dispatch(setRepeatedErrMsg());
  dispatch(setNotEnoughErrMsg());
};
export const onInputFocus = () => (dispatch) => {
  dispatch(resetEnoughPlayers());
  dispatch(resetRepeatedPlayers());
};

export const onTeamCountChangeTC = (count) => (dispatch) => {
  dispatch(teamCountCreator(count));
  dispatch(updateSubsCreator());
};
export const onTeamCountBlurTC = (count) => (dispatch) => {
  dispatch(teamBlurCreator(count));
  dispatch(updateSubsCreator());
  dispatch(checkEnoughPlayers());
  dispatch(setNotEnoughErrMsg());
};

export const onMaxPlayersChangeTC = (count) => (dispatch) => {
  dispatch(maxPlayersCountCreator(count));
  dispatch(updateSubsCreator());
};
export const onMaxPlayersBlurTC = (count) => (dispatch) => {
  dispatch(maxPlayersBlurCreator(count));
  dispatch(updateSubsCreator());
};

export const divideTeamsTC = () => (dispatch) => {
  dispatch(validateInputs());
  dispatch(divideTeamsCreator());
};