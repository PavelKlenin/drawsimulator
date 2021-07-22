const ON_INPUT_TEXT = "ON_INPUT_TEXT";
const CHANGE_TEAMS_COUNT = "CHANGE_TEAMS_COUNT";
const CHANGE_PLAYERS_COUNT = "CHANGE_PLAYERS_COUNT";
const BLUR_TEAMS_COUNT = "BLUR_TEAMS_COUNT";
const BLUR_PLAYERS_COUNT = "BLUR_PLAYERS_COUNT";

const initialState = {
  playerList: [],
  teamsCount: 3,
  playersCount: 5,
  teams: [],
};

const generalReducer = (state = initialState, action) => {
  //!
  let playerList = [];
  let maxPlayers = calcMaxPlayers(state.teamsCount, state.playersCount);

  switch (action.type) {
    case ON_INPUT_TEXT:
      const arrPlayerList = charToArr(action.value);
      if (arrPlayerList) {
        playerList = arrPlayerList.map((player, id) => {
          return {
            id: id + 1,
            name: player,
            subs: checkSubsPlayer((id = id + 1), maxPlayers),
          };
        });
      }
      return {...state, playerList}
    case CHANGE_TEAMS_COUNT:
      state.teamsCount = action.value;
      maxPlayers = calcMaxPlayers(state.teamsCount, state.playersCount);
      playerList = state.playerList.map((player) => {
        return { ...player, subs: checkSubsPlayer(player.id, maxPlayers) };
      });
      return {...state, playerList}
    case CHANGE_PLAYERS_COUNT:
      state.playersCount = action.value;
      maxPlayers = calcMaxPlayers(state.teamsCount, state.playersCount);
      playerList = state.playerList.map((player) => {
        return { ...player, subs: checkSubsPlayer(player.id, maxPlayers) };
      });
      return {...state, playerList}

      // state.playerList = playerList;
      // return state;
    case BLUR_PLAYERS_COUNT:
      action.value > 0
        ? (state.playersCount = action.value)
        : (state.playersCount = 5);
      maxPlayers = calcMaxPlayers(state.teamsCount, state.playersCount);
      playerList = state.playerList.map((player) => {
        return { ...player, subs: checkSubsPlayer(player.id, maxPlayers) };
      });
      return {...state, playerList}

      // state.playerList = playerList;
      // return state;
    case BLUR_TEAMS_COUNT:
      action.value > 0
        ? (state.teamsCount = action.value)
        : (state.teamsCount = 3);
      maxPlayers = calcMaxPlayers(state.teamsCount, state.playersCount);
      playerList = state.playerList.map((player) => {
        return { ...player, subs: checkSubsPlayer(player.id, maxPlayers) };
      });
      return {...state, playerList}

      // state.playerList = playerList;
      // return state;
    default:
      return state;
  }
};

export default generalReducer;

export const inputTextCreator = (text) => {
  return { type: ON_INPUT_TEXT, value: text };
};

export const teamCountCreator = (count) => {
  return { type: CHANGE_TEAMS_COUNT, value: count };
};

export const playersCountCreator = (count) => {
  return { type: CHANGE_PLAYERS_COUNT, value: count };
};

export const teamBlurCreator = (count) => {
  return { type: BLUR_TEAMS_COUNT, value: count };
};

export const playersBlurCreator = (count) => {
  return { type: BLUR_PLAYERS_COUNT, value: count };
};

const emptyLineCheck = (array) => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (!array[i]) {
      array.splice(i, 1);
    }
  }
};

const charToArr = (chars) => {
  if (chars) {
    let arrList = chars.split("\n");
    emptyLineCheck(arrList);
    let correctList = arrList.map((item) => {
      return item
        .replace(/\s+/g, " ") //* убираем лишние пробелы
        .trim()
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
      //* каждая буква после пробела, кавычек - заглавная

      // return item.replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
    });
    return correctList;
  } else return;
};

const checkSubsPlayer = (playerId, maxPlayers) => {
  return playerId > maxPlayers ? true : false;
};

const calcMaxPlayers = (teamsCount, playersCount) => teamsCount * playersCount;
