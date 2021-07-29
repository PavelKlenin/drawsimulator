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
              subs: checkSubsPlayer((id = id + 1), maxPlayers(state)),
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
      return maxPlayers(state)
        ? {
            ...state,
            playerList: state.playerList.map((player) => {
              return {
                ...player,
                subs: checkSubsPlayer(player.id, maxPlayers(state)),
              };
            }),
          }
        : state;
    case DIVIDE_TEAMS: {
      let restPlayersCount = state.playerList.length; // изначально кол-во оставшихся игроков равно списку;
      let nextPlayerIndex = 0; // индекс игрока, с которого надо добавлять в след.команду;
      return {
        ...state,
        teams: createNewTeams(state).map((team, i) => {
          // проверка на запасную команду. Т.к. i начинается с 0, утверждение будет верно только при наличии лишней (запасной) команды
          let isSubsTeam = +state.teamsCount === i;
          let restTeamsCount = state.teamsCount - i; // сколько осталось команд (для расчета кол-ва игроков при недоборе игроков)
          let computedPlayersCount; // количество игроков в каждую команду
          isSubsTeam // если есть запасные, они будут отображаться все в одной команде
            ? (computedPlayersCount = restPlayersCount)
            : (computedPlayersCount =
                state.playerList.length < maxPlayers(state) // при недоборе в каждую итерацию кол-во игроков считается относительно
                  ? Math.ceil(restPlayersCount / restTeamsCount) // оставшегося количества игроков и команд для равномерного распределения
                  : +state.playersCount); // преобразование в число (иначе nextPlayerIndex складывается конкатенацией)

          // добавление игроков в команду
          for (
            let i = nextPlayerIndex;
            i < nextPlayerIndex + computedPlayersCount;
            i++
          ) {
            // проверка на наличие игрока, чтобы запасная команда не наполняла команду underfined-игроками
            team.squad = [...team.squad, state.playerList[i]];
          }
          restPlayersCount = restPlayersCount - computedPlayersCount; // для след.итераций из оставшихся игроков вычитается кол-во игроков в команде
          nextPlayerIndex = nextPlayerIndex + computedPlayersCount; // индекс для след.команды равен сумме всех игроков из предыдущих команд
          return team;
        }),
      };
    }
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
  // добавление пустых команд по количеству команд (state.teamsCount)
  for (let i = 0; i < state.teamsCount; i++) {
    teams = [...teams, { id: i + 1, name: `Команда ${i + 1}`, squad: [] }];
  }
  // добавление пустой команды при наличии запасных
  if (state.playerList.length > maxPlayers(state)) {
    teams = [...teams, { id: teams.length + 1, name: "Запасные", squad: [] }];
  }
  return teams;
};

const maxPlayers = (state) => {
  return state.teamsCount * state.playersCount;
};
