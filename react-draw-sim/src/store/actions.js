import * as CONST from "./consts";

//* inputDataReducer
const addNewPlayersAC = (text) => {
  return { type: CONST.ADD_NEW_PLAYERS, value: text };
};
export const changePlayerBasketAC = (playerId) => {
  return { type: CONST.CHANGE_PLAYER_BASKET, playerId };
};
const calcBasketLengthAC = () => {
  return { type: CONST.CALC_BASKET_LENGTH };
};
const changeTeamsCountAC = (count) => {
  return { type: CONST.CHANGE_TEAMS_COUNT, value: count };
};
const changeMaxTeamPlayersAC = (count) => {
  return { type: CONST.CHANGE_MAX_TEAM_PLAYERS, value: count };
};
const checkTeamsCountAC = (count) => {
  return { type: CONST.CHECK_TEAMS_COUNT, value: count };
};
const checkMaxTeamPlayersAC = (count) => {
  return { type: CONST.CHECK_MAX_TEAM_PLAYERS, value: count };
};
const updateSubsAC = () => {
  return { type: CONST.UPDATE_SUBS };
};
export const toggleFocusAC = (isFocused) => {
  return { type: CONST.TOGGLE_FOCUS,  isFocused};
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
const checkBasketLengthErrAC = (playerList, totalTeams) => {
  return {
    type: CONST.CHECK_BASKET_LENGTH_ERR,
    data: { playerList, totalTeams },
  };
};
const checkRequiredPlayersAC = (playerList, minPlayersCount) => {
  return {
    type: CONST.CHECK_REQUIRED_PLAYERS,
    data: { playerList, minPlayersCount },
  };
};

//* ThunkCreators
export const onInputChangeTC = (text) => (dispatch, getState) => {
  dispatch(addNewPlayersAC(text));
  dispatch(updateSubsAC());
  dispatch(calcBasketLengthAC());
  const state = getState().inputDataReducer;
  const { playerList, totalTeams } = state;
  dispatch(checkRequiredPlayersAC(playerList, minPlayersCount(state)));
  dispatch(checkForRepeatedPlayersAC(playerList));
  dispatch(checkBasketLengthErrAC(playerList, totalTeams));
  dispatch(checkValidationAC());
};
export const onInputBlurTC = () => (dispatch, getState) => {
  dispatch(toggleFocusAC(false));
  const state = getState().inputDataReducer;
  dispatch(checkRequiredPlayersAC(state.playerList, minPlayersCount(state)));
};

export const onDataPlayerClickTC = (playerId) => (dispatch, getState) => {
  dispatch(changePlayerBasketAC(playerId));
  dispatch(calcBasketLengthAC());
  const { playerList, totalTeams } = getState().inputDataReducer;
  dispatch(checkBasketLengthErrAC(playerList, totalTeams));
  dispatch(checkValidationAC());
};

export const onTeamCountChangeTC = (count) => (dispatch, getState) => {
  dispatch(changeTeamsCountAC(count));
  dispatch(updateSubsAC());
  dispatch(calcBasketLengthAC());
  const state = getState().inputDataReducer;
  const { playerList, totalTeams } = state;
  dispatch(checkRequiredPlayersAC(playerList, minPlayersCount(state)));
  dispatch(checkBasketLengthErrAC(playerList, totalTeams));
  dispatch(checkValidationAC());
};

export const onTeamCountBlurTC = (count) => (dispatch, getState) => {
  dispatch(checkTeamsCountAC(count));
  dispatch(updateSubsAC());
  dispatch(calcBasketLengthAC());
  dispatch(toggleFocusAC(false));
  const state = getState().inputDataReducer;
  const { playerList, totalTeams } = state;
  dispatch(checkRequiredPlayersAC(playerList, minPlayersCount(state)));
  dispatch(checkBasketLengthErrAC(playerList, totalTeams));
  dispatch(checkValidationAC());
};

export const onMaxPlayersChangeTC = (count) => (dispatch) => {
  dispatch(changeMaxTeamPlayersAC(count));
  dispatch(updateSubsAC());
};
export const onMaxPlayersBlurTC = (count) => (dispatch) => {
  dispatch(checkMaxTeamPlayersAC(count));
  dispatch(updateSubsAC());
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
