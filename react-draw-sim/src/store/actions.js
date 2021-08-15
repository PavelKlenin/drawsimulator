import * as CONST from './consts';

const addNewPlayersAC = (text) => {
	return { type: CONST.ADD_NEW_PLAYERS, value: text };
};
const changeTeamsCountAC = (count) => {
  return { type: CONST.CHANGE_TEAMS_COUNT, value: count };
};
const changeMaxTeamPlayersAC = (count) => {
  return { type: CONST.CHANGE_MAX_TEAM_PLAYERS, value: count };
};
// const changeMinTeamPlayersAC = (count) => {
//   return { type: CONST.CHANGE_MIN_TEAM_PLAYERS, value: count };
// };
const checkTeamsCountAC = (count) => {
  return { type: CONST.CHECK_TEAMS_COUNT, value: count };
};
const checkMaxTeamPlayersAC = (count) => {
  return { type: CONST.CHECK_MAX_TEAM_PLAYERS, value: count };
};
// const checkMinTeamPlayersAC = (count) => {
//   return { type: CONST.CHECK_MIN_TEAM_PLAYERS, value: count };
// };
const checkForSubsAC = () => {
  return { type: CONST.CHECK_FOR_SUBS };
};
const divideTeamsAC = () => {
  return { type: CONST.DIVIDE_TEAMS };
};
export const changeTeamColorAC = (teamId) => {
  return { type: CONST.CHANGE_TEAM_COLOR, teamId };
};
export const toggleRandomAC = () => {
  return { type: CONST.TOGGLE_RANDOM };
};
const checkValidationAC = () => {
  return { type: CONST.CHECK_VALIDATION };
};
const checkForRepeatedPlayersAC = () => {
  return { type: CONST.CHECK_FOR_REPEATED_PLAYERS };
};
const setRepeatedErrMsgAC = () => {
  return { type: CONST.SET_REPEATED_ERR_MSG };
};
const resetRepeatedErrMsgAC = () => {
  return { type: CONST.RESET_REPEATED_ERR_MSG };
};
const checkForRequiredAC = (text) => {
  return { type: CONST.CHECK_FOR_REQUIRED, text };
};
// const resetRequiredErrMsgAC = () => {
//   return { type: CONST.RESET_REQUIRED_ERR_MSG };
// };
const checkForEnoughPlayersAC = () => {
  return { type: CONST.CHECK_FOR_ENOUGH_PLAYERS };
};
const setNotEnoughErrMsgAC = () => {
  return { type: CONST.SET_NOT_ENOUGH_ERR_MSG };
};
export const resetNotEnoughErrMsgAC = () => {
  return { type: CONST.RESET_NOT_ENOUGH_ERR_MSG };
};

//* ThunkCreators
export const onInputChangeTC = (text) => (dispatch) => {
  dispatch(addNewPlayersAC(text));
  dispatch(checkForSubsAC());
  dispatch(checkForRequiredAC(text));
  dispatch(checkForEnoughPlayersAC());
  dispatch(checkForRepeatedPlayersAC());
  dispatch(checkValidationAC());
};
export const onInputBlurTC = () => (dispatch) => {
  dispatch(setRepeatedErrMsgAC());
  dispatch(setNotEnoughErrMsgAC());
};
export const onInputFocus = () => (dispatch) => {
  dispatch(resetNotEnoughErrMsgAC());
  dispatch(resetRepeatedErrMsgAC());
};

export const onTeamCountChangeTC = (count) => (dispatch) => {
  dispatch(changeTeamsCountAC(count));
  dispatch(checkForSubsAC());
};
export const onTeamCountBlurTC = (count) => (dispatch) => {
  dispatch(checkTeamsCountAC(count));
  dispatch(checkForSubsAC());
  dispatch(checkForEnoughPlayersAC());
  dispatch(setNotEnoughErrMsgAC());
};

export const onMaxPlayersChangeTC = (count) => (dispatch) => {
  dispatch(changeMaxTeamPlayersAC(count));
  dispatch(checkForSubsAC());
};
export const onMaxPlayersBlurTC = (count) => (dispatch) => {
  dispatch(checkMaxTeamPlayersAC(count));
  dispatch(checkForSubsAC());
};

export const divideTeamsTC = () => (dispatch) => {
  dispatch(checkValidationAC());
  dispatch(divideTeamsAC());
};