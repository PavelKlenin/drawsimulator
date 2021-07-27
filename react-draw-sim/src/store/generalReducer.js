const ON_INPUT_TEXT = "ON_INPUT_TEXT";
const CHANGE_TEAMS_COUNT = "CHANGE_TEAMS_COUNT";
const CHANGE_PLAYERS_COUNT = "CHANGE_PLAYERS_COUNT";
const BLUR_TEAMS_COUNT = "BLUR_TEAMS_COUNT";
const BLUR_PLAYERS_COUNT = "BLUR_PLAYERS_COUNT";
const UPDATE_SUBS = "UPDATE_SUBS";
const DIVIDE_TEAMS = "DIVIDE_TEAMS";

const initialState = {
  playerList: [],
  teamsCount: 3,
  playersCount: 5,
  maxPlayers() {
    return this.teamsCount * this.playersCount;
  },
  isRandom: false,
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
      };
    case CHANGE_PLAYERS_COUNT:
      return {
        ...state,
        playersCount: action.value,
      };
    case BLUR_PLAYERS_COUNT:
      return {
        ...state,
        playersCount: action.value > 0 ? action.value : 5,
      };
    case BLUR_TEAMS_COUNT:
      return {
        ...state,
        teamsCount: action.value > 0 ? action.value : 3,
      };
    case UPDATE_SUBS:
      return state.maxPlayers()
        ? {
            ...state,
            playerList: state.playerList.map((player) => {
              return {
                ...player,
                subs: checkSubsPlayer(player.id, state.maxPlayers()),
              };
            }),
          }
        : state;
    case DIVIDE_TEAMS:
      // let players = [...state.playerList]; // для распределения с удалением из массива
      let restPlayersCount;
      return {
        ...state,
        teams: createNewTeams(state).map((team, i) => {
          if (state.playerList.length < state.maxPlayers()) {
            debugger;
            i === 0
              ? (restPlayersCount = state.playerList.length)
              : (restPlayersCount =
                  restPlayersCount -
                  Math.ceil(restPlayersCount / (state.teamsCount - i + 1)));
            debugger;
            return fillTeamWithPlayers(
              // Math.ceil(players.length / state.teamsCount),
              Math.ceil(restPlayersCount / (state.teamsCount - i)),
              // при недоборе игроков необходимое количество игроков в следующую
              // команду будет высчитваться после наполнения текущей команды
              // для равномерного распределения
              team,
              // players
              state.playerList
            );
          } else {
            debugger;
            // return fillTeamWithPlayers(state.playersCount, team, players);
            return fillTeamWithPlayers(
              state.playersCount,
              team,
              state.playerList
            );
          }
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

export const updateSubsCreator = () => {
  return { type: UPDATE_SUBS };
};

export const divideTeamsCreator = () => {
  return { type: DIVIDE_TEAMS };
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
        .replace(/\s+/g, " ") //* убираем
        .trim() //* лишние пробелы
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase()); //* каждая буква после пробела, кавычек - заглавная
    });
    return correctList;
  } else return;
};

const checkSubsPlayer = (playerId, maxPlayers) => {
  return playerId > maxPlayers ? true : false;
};

const createNewTeams = (state) => {
  let teams = [];
  for (let i = 0; i < state.teamsCount; i++) {
    teams = [...teams, { id: i + 1, name: `Команда ${i + 1}`, squad: [] }];
  } // добавление пустых команд по количеству команд (state.teamsCount)
  if (state.playerList.length > state.maxPlayers()) {
    teams = [...teams, { id: teams.length + 1, name: "Запасные", squad: [] }];
  } // добавление пустой команды при наличии запасных
  return teams;
};

// Без удаления игроков из массива
const fillTeamWithPlayers = (playersCount, team, playerList) => {
  // for (let i = 0; i < team.id; i++) {
  //   if (team[i]) {
  //     dividedPlayersCount = dividedPlayersCount + team[i].length;
  //   } else {
  //     let dividedPlayersCount = 0;
  //   }
  // }
  for (let i = 0; i < playersCount; i++) {
    if (playerList[(team.id - 1) * playersCount + i + i]) {
      // условие для запасной команды, чтобы не добирала underfined
      team.squad = [
        ...team.squad,
        playerList[(team.id - 1) * playersCount + i + i],
      ]; // ((team.id - 1) * playersCount + i) порядковый номер игрока, чтобы для текущей команды добавлялись игроки не с начала массива
    }
  }
  return team;
};

// С удалением игроков из массива
// const fillTeamWithPlayers = (playersCount, team, players) => {
//   for (let i = 0; i < playersCount; i++) {
//     if (players[i]) {
//       // условие для запасной команды, чтобы не добирала underfined
//       team.squad = [
//         ...team.squad,
//         players.shift(), // с удалением игрока из массива для того, чтобы в команду добавлялся всегда первый игрок
//       ];
//     }
//   }
//   return team;
// };
