const ON_INPUT_TEXT = "ON_INPUT_TEXT";
const CHANGE_TEAMS_COUNT = "CHANGE_TEAMS_COUNT";
const CHANGE_PLAYERS_COUNT = "CHANGE_PLAYERS_COUNT";
const BLUR_TEAMS_COUNT = "BLUR_TEAMS_COUNT";
const BLUR_PLAYERS_COUNT = "BLUR_PLAYERS_COUNT";
const UPDATE_SUBS = "UPDATE_SUBS";
const DIVIDE_TEAMS = "DIVIDE_TEAMS";
const TOGGLE_RANDOM = "TOGGLE_RANDOM";
const CHANGE_TEAM_COLOR = "CHANGE_TEAM_COLOR";

const initialState = {
  playerList: [],
  teamsCount: 3,
  playersCount: 5,
  colorList: [
    { id: 1, color: "teamRed", usedById: null },
    { id: 2, color: "teamOrange", usedById: null },
    { id: 3, color: "teamBlue", usedById: null },
    { id: 4, color: "teamGreen", usedById: null },
    { id: 5, color: "teamGreenYellow", usedById: null },
    { id: 6, color: "teamBlack", usedById: null },
    { id: 7, color: "teamWhite", usedById: null },
  ],
  isRandom: false,
  teams: [],
};

const reducer = (state = initialState, action) => {
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
    case TOGGLE_RANDOM:
      return {
        ...state,
        // isRandom: action.value, // для checkbox
        isRandom: !state.isRandom, // для div
      };
    case DIVIDE_TEAMS: {
      let restPlayersCount = state.playerList.length; // изначально кол-во оставшихся игроков равно списку;
      let nextPlayerIndex = 0; // индекс игрока, с которого надо добавлять в след.команду;
      let playerList = state.isRandom
        ? shuffledList(state.playerList)
        : state.playerList;
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
                playerList.length < maxPlayers(state) // при недоборе в каждую итерацию кол-во игроков считается относительно
                  ? Math.ceil(restPlayersCount / restTeamsCount) // оставшегося количества игроков и команд для равномерного распределения
                  : +state.playersCount); // преобразование в число (иначе nextPlayerIndex складывается конкатенацией)

          // добавление игроков в команду
          for (
            let i = nextPlayerIndex;
            i < nextPlayerIndex + computedPlayersCount;
            i++
          ) {
            // проверка на наличие игрока, чтобы запасная команда не наполняла команду underfined-игроками
            team.squad = [...team.squad, playerList[i]];
          }
          restPlayersCount = restPlayersCount - computedPlayersCount; // для след.итераций из оставшихся игроков вычитается кол-во игроков в команде
          nextPlayerIndex = nextPlayerIndex + computedPlayersCount; // индекс для след.команды равен сумме всех игроков из предыдущих команд
          return team;
        }),
      };
    }
    case CHANGE_TEAM_COLOR: {
      const teamsColors = [...state.colorList];
      const currentColor = teamsColors.find(
        (color) => color.usedById === action.teamId
      );
      if (currentColor) {
        const currentIdx = teamsColors.indexOf(currentColor);
        teamsColors[currentIdx].usedById = null;
        if (currentIdx < teamsColors.length) {
          setNextTeamColor(currentIdx + 1, teamsColors, action.teamId);
        }
      } else {
        setNextTeamColor(0, teamsColors, action.teamId);
      }
      return {
        ...state,
        colorList: [...teamsColors],
        teams: state.teams.map(team => {
          team.color = null;
          state.colorList.forEach((color) => {
            if (color.usedById === team.id) {
              team.color = color.color;
            }
          });
          return { ...team };
        }),
      };
    }
    default:
      return state;
  }
};

export default reducer;

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

export const changeTeamColorCreator = (teamId) => {
  return { type: CHANGE_TEAM_COLOR, teamId };
};

// для checkbox
// export const toggleRandomCreator = (value) => {
//   return { type: TOGGLE_RANDOM, value };
// };

// для div
export const toggleRandomCreator = () => {
  return { type: TOGGLE_RANDOM };
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
    teams = [
      ...teams,
      {
        id: i + 1,
        title: `Команда ${i + 1}`,
        squad: [],
        color: null,
        isSub: false,
      },
    ];
  }
  // добавление пустой команды при наличии запасных
  if (state.playerList.length > maxPlayers(state)) {
    teams = [
      ...teams,
      {
        id: teams.length + 1,
        title: "Запасные",
        squad: [],
        color: null,
        isSub: true,
      },
    ];
  }
  return teams;
};

const maxPlayers = (state) => {
  return state.teamsCount * state.playersCount;
};

// алгоритм Фишера-Йейтса - Fisher–Yates shuffle
const shuffledList = (list) => {
  let mainList = list.filter((player) => !player.subs);
  let subList = list.filter((player) => player.subs);
  for (var i = mainList.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [mainList[randomIndex], mainList[i]] = [mainList[i], mainList[randomIndex]];
  }
  return [...mainList, ...subList];
};

const setNextTeamColor = (startIdx, colorList, teamId) => {
  for (let i = startIdx; i < colorList.length; i++) {
    if (colorList[i].usedById === null) {
      colorList[i].usedById = teamId;
      break;
    }
  }
};
