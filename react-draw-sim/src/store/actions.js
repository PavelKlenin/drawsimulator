import * as CONST from "./consts";

//* inputDataReducer
const addNewPlayersAC = (text) => {
  return { type: CONST.ADD_NEW_PLAYERS, value: text };
};
export const changePlayerBasketAC = (playerId) => {
  return { type: CONST.CHANGE_PLAYER_BASKET, playerId };
};
const checkBasketLengthAC = () => {
  return { type: CONST.CHECK_BASKET_LENGTH };
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
export const toggleRandomAC = () => {
  return { type: CONST.TOGGLE_RANDOM };
};

//* teamsReducer
const divideTeamsAC = (totalTeams, maxPlayersInTeam) => {
  return { type: CONST.DIVIDE_TEAMS, data: { totalTeams, maxPlayersInTeam } };
};
const divideBasketTeamsAC = (totalTeams, maxPlayersInTeam) => {
  return {
    type: CONST.DIVIDE_BASKET_TEAMS,
    data: { totalTeams, maxPlayersInTeam },
  };
};
export const changeTeamColorAC = (teamId) => {
  return { type: CONST.CHANGE_TEAM_COLOR, teamId };
};
export const resetTeamColorsAC = () => {
  return { type: CONST.RESET_TEAM_COLORS };
};
export const preparePlayerListAC = (playerList, isRandom) => {
  return { type: CONST.PREPARE_PLAYERLIST, data: { playerList, isRandom } };
};
export const prepareBasketListAC = (playerList, isRandom) => {
  return { type: CONST.PREPARE_BASKET_LIST, data: { playerList, isRandom } };
};

//* errorReducer
const checkValidationAC = () => {
  return { type: CONST.CHECK_VALIDATION };
};
const checkForRepeatedPlayersAC = (playerList) => {
  return { type: CONST.CHECK_FOR_REPEATED_PLAYERS, playerList };
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
const setBasketLengthErrAC = (playerList, totalTeams) => {
  return {
    type: CONST.SET_BASKET_LENGTH_ERR,
    data: { playerList, totalTeams },
  };
};

// const resetRequiredErrMsgAC = () => {
//   return { type: CONST.RESET_REQUIRED_ERR_MSG };
// };
const checkForEnoughPlayersAC = (playerList, minPlayersCount) => {
  return {
    type: CONST.CHECK_FOR_ENOUGH_PLAYERS,
    data: { playerList, minPlayersCount },
  };
};
const setNotEnoughErrMsgAC = (minPlayersCount) => {
  return { type: CONST.SET_NOT_ENOUGH_ERR_MSG, minPlayersCount };
};
export const resetNotEnoughErrMsgAC = () => {
  return { type: CONST.RESET_NOT_ENOUGH_ERR_MSG };
};

//* ThunkCreators
export const onInputChangeTC = (text) => (dispatch, getState) => {
  dispatch(addNewPlayersAC(text));
  dispatch(checkForSubsAC());
  dispatch(checkForRequiredAC(text));
  dispatch(checkBasketLengthAC());
  const state = getState().inputDataReducer;
  const { playerList, totalTeams } = state;
  dispatch(checkForEnoughPlayersAC(playerList, minPlayersCount(state)));
  dispatch(checkForRepeatedPlayersAC(playerList));
  dispatch(setBasketLengthErrAC(playerList, totalTeams));
  dispatch(setRepeatedErrMsgAC());
  dispatch(checkValidationAC());
};
export const onInputBlurTC = () => (dispatch, getState) => {
  dispatch(setNotEnoughErrMsgAC(minPlayersCount(getState().inputDataReducer)));
};
export const onInputFocus = () => (dispatch) => {
  dispatch(resetNotEnoughErrMsgAC());
  dispatch(resetRepeatedErrMsgAC());
};

export const onDataPlayerClickTC = (playerId) => (dispatch, getState) => {
  dispatch(changePlayerBasketAC(playerId));
  dispatch(checkBasketLengthAC());
  const { playerList, totalTeams } = getState().inputDataReducer;
  dispatch(setBasketLengthErrAC(playerList, totalTeams));
  dispatch(checkValidationAC());
};

export const onTeamCountChangeTC = (count) => (dispatch, getState) => {
  dispatch(changeTeamsCountAC(count));
  dispatch(checkForSubsAC());
  dispatch(checkBasketLengthAC());
  const state = getState().inputDataReducer;
  const { playerList, totalTeams } = state;
  dispatch(checkForEnoughPlayersAC(playerList, minPlayersCount(state)));
  dispatch(setBasketLengthErrAC(playerList, totalTeams));
  dispatch(checkValidationAC());
};

export const onTeamCountBlurTC = (count) => (dispatch, getState) => {
  dispatch(checkTeamsCountAC(count));
  dispatch(checkForSubsAC());
  dispatch(checkBasketLengthAC());
  const state = getState().inputDataReducer;
  const { playerList, totalTeams } = state;
  dispatch(checkForEnoughPlayersAC(playerList, minPlayersCount(state)));
  dispatch(setNotEnoughErrMsgAC(minPlayersCount(state)));
  dispatch(setBasketLengthErrAC(playerList, totalTeams));
  dispatch(checkValidationAC());
};

export const onMaxPlayersChangeTC = (count) => (dispatch) => {
  dispatch(changeMaxTeamPlayersAC(count));
  dispatch(checkForSubsAC());
};
export const onMaxPlayersBlurTC = (count) => (dispatch) => {
  dispatch(checkMaxTeamPlayersAC(count));
  dispatch(checkForSubsAC());
};

export const divideTeamsTC = () => (dispatch, getState) => {
  dispatch(checkValidationAC());
  const isValid = getState().errorReducer.isValid;
  const { playerList, isRandom, totalTeams, maxPlayersInTeam } =
    getState().inputDataReducer;
  if (isValid) {
    dispatch(resetTeamColorsAC());
    if (playerList.some((player) => player.basket)) {
      dispatch(prepareBasketListAC(playerList, isRandom));
      dispatch(divideBasketTeamsAC(totalTeams, maxPlayersInTeam));
    } else {
      dispatch(preparePlayerListAC(playerList, isRandom));
      dispatch(divideTeamsAC(totalTeams, maxPlayersInTeam));
    }
  }
};

const minPlayersCount = (state) => {
  return state.totalTeams * state.minPlayersInTeam;
};
