const ON_INPUT_TEXT = "ON_INPUT_TEXT";
const CHANGE_TEAMS_COUNT = "CHANGE_TEAMS_COUNT";
const CHANGE_PLAYERS_COUNT = "CHANGE_PLAYERS_COUNT";
const BLUR_TEAMS_COUNT = "BLUR_TEAMS_COUNT";
const BLUR_PLAYERS_COUNT = "BLUR_PLAYERS_COUNT";

const initialState = {
  playerList: [],
  teamsCount: 3,
  playersCount: 5,
  maxPlayers() {
    return this.teamsCount * this.playersCount;
  },
  teams: [],
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_INPUT_TEXT:
      const arrPlayerList = charToArr(action.value);
      if (arrPlayerList) {
        return {
          ...state,
          playerList: arrPlayerList.map((player, id) => {
            return {
              id: id + 1,
              name: player,
              subs: checkSubsPlayer((id = id + 1), state.maxPlayers()),
            };
          }),
        };
      } else return { ...state, playerList: [] };
    case CHANGE_TEAMS_COUNT:
      return {
        ...state,
        teamsCount: action.value,
        playerList:
          action.value > 0
            ? state.playerList.map((player) => {
                return {
                  ...player,
                  subs: checkSubsPlayer(player.id, state.maxPlayers()),
                };
              })
            : state.playerList,
      };
    case CHANGE_PLAYERS_COUNT:
      return {
        ...state,
        playersCount: action.value,
        playerList:
          action.value > 0
            ? state.playerList.map((player) => {
                return {
                  ...player,
                  subs: checkSubsPlayer(player.id, state.maxPlayers()),
                };
              })
            : state.playerList,
      };
    case BLUR_PLAYERS_COUNT:
      return {
        ...state,
        playersCount: action.value > 0 ? action.value : 5,
        playerList: state.playerList.map((player) => {
          return {
            ...player,
            subs: checkSubsPlayer(player.id, state.maxPlayers()),
          };
        }),
      };
    case BLUR_TEAMS_COUNT:
      debugger;
      return {
        ...state,
        teamsCount: action.value > 0 ? action.value : 3, //! не устанавливает значение до playerList
        playerList: state.playerList.map((player) => {
          return {
            ...player,
            subs: checkSubsPlayer(player.id, state.maxPlayers()),
          };
        }),
      };
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
