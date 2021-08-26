import * as CONST from "./consts";

const initialState = {
  playerList: [], // { id: 1, name: player, subs: false, basket: 0, filledBasket: false, repeated: false,}
  totalTeams: 3,
  maxPlayersInTeam: 5,
  minPlayersInTeam: 2,
  isFocused: { inputPlayers: true, inputTeams: false },
  isRandom: false,
};

const inputDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONST.TOGGLE_PLAYERS_FOCUS:
      return {
        ...state,
        isFocused: {
          ...state.isFocused,
          inputPlayers: action.isFocused,
        },
      };
    case CONST.TOGGLE_TEAMS_FOCUS:
      return {
        ...state,
        isFocused: {
          ...state.isFocused,
          inputTeams: action.isFocused,
        },
      };
    case CONST.ADD_NEW_PLAYERS:
      const arrPlayerList = convertTextToArr(action.value);
      if (arrPlayerList) {
        return {
          ...state,
          playerList: arrPlayerList.map((player, idx) => {
            return {
              id: idx + 1,
              name: player,
              subs: checkForSubsPlayers(idx + 1, setMaxPlayers(state)),
              basket: state.playerList[idx] ? state.playerList[idx].basket : 0,
              filledBasket: false,
              repeated: arrPlayerList.find((samePlayer, i) => {
                return (
                  samePlayer.toUpperCase() === player.toUpperCase() && i !== idx
                );
              })
                ? true
                : false,
            };
          }),
        };
      } else return { ...state, playerList: [] };
    case CONST.CHANGE_PLAYER_BASKET:
      return {
        ...state,
        playerList: state.playerList.map((player) => {
          if (player.id === action.playerId && !player.subs) {
            return {
              ...player,
              basket: player.basket === 4 ? 0 : ++player.basket,
            };
          } else return { ...player };
        }),
      };
    case CONST.CALC_BASKET_LENGTH:
      return {
        ...state,
        playerList: state.playerList.map((player) => {
          return {
            ...player,
            filledBasket:
              state.playerList.filter(
                (p) =>
                  player.basket &&
                  p.basket === player.basket &&
                  !p.subs &&
                  !player.subs
              ).length > state.totalTeams
                ? true
                : false,
          };
        }),
      };
    case CONST.CHANGE_TEAMS_COUNT:
      return {
        ...state,
        totalTeams: action.value,
      };
    case CONST.CHECK_TEAMS_COUNT:
      return {
        ...state,
        totalTeams: action.value > 1 ? action.value : 2,
      };
    case CONST.CHANGE_MAX_TEAM_PLAYERS:
      return {
        ...state,
        maxPlayersInTeam: action.value,
      };
    case CONST.CHECK_MAX_TEAM_PLAYERS:
      return {
        ...state,
        maxPlayersInTeam: action.value > 1 ? action.value : 2,
      };
    case CONST.CHANGE_MIN_TEAM_PLAYERS:
      return {
        ...state,
        minPlayersInTeam: action.value,
      };
    case CONST.CHECK_MIN_TEAM_PLAYERS:
      return {
        ...state,
        minPlayersInTeam:
          action.value > 1 && action.value <= state.maxPlayersInTeam
            ? action.value
            : state.maxPlayersInTeam - 1,
      };
    case CONST.UPDATE_SUBS:
      return setMaxPlayers(state)
        ? {
            ...state,
            playerList: state.playerList.map((player) => {
              return {
                ...player,
                subs: checkForSubsPlayers(player.id, setMaxPlayers(state)),
              };
            }),
          }
        : state;
    case CONST.TOGGLE_RANDOM:
      return {
        ...state,
        isRandom: !state.isRandom,
      };
    default:
      return state;
  }
};

export default inputDataReducer;

//* Additional functions
const emptyLineCheck = (array) => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (!array[i]) {
      array.splice(i, 1);
    }
  }
};
// конвертация введенных игроков в массив игроков
const convertTextToArr = (chars) => {
  if (chars) {
    let arrList = chars.split("\n"); // разделяем по игроков по новой строке
    emptyLineCheck(arrList); // пустые строки удаляются
    let correctList = arrList.map((item) => {
      return item
        .replace(/\s+/g, " ") // убираем
        .trim() // лишние пробелы
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase()); // каждая буква после пробела, кавычек - заглавная
    });
    return correctList;
  } else return;
};
const checkForSubsPlayers = (playerIdx, setMaxPlayers) => {
  return playerIdx > setMaxPlayers ? true : false;
};
// const createNewTeams = (state) => {
//   let teams = [];
//   // добавление пустых команд по количеству команд (state.totalTeams)
//   for (let i = 0; i < state.totalTeams; i++) {
//     teams = [
//       ...teams,
//       {
//         id: i + 1,
//         title: `Команда ${i + 1}`,
//         squad: [],
//         color: null,
//         isSub: false,
//       },
//     ];
//   }
//   // добавление пустой команды при наличии запасных
//   if (state.playerList.length > setMaxPlayers(state)) {
//     teams = [
//       ...teams,
//       {
//         id: teams.length + 1,
//         title: "Запасные",
//         squad: [],
//         color: null,
//         isSub: true,
//       },
//     ];
//   }
//   return teams;
// };
const setMaxPlayers = (state) => {
  return state.totalTeams * state.maxPlayersInTeam;
};
