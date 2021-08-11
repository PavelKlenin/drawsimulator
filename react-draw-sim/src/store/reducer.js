const ON_INPUT_TEXT = "ON_INPUT_TEXT";
const CHANGE_TEAMS_COUNT = "CHANGE_TEAMS_COUNT";
const BLUR_TEAMS_COUNT = "BLUR_TEAMS_COUNT";
const CHANGE_MAX_PLAYERS_COUNT = "CHANGE_MAX_PLAYERS_COUNT";
const BLUR_MAX_PLAYERS_COUNT = "BLUR_MAX_PLAYERS_COUNT";
const CHANGE_MIN_PLAYERS_COUNT = "CHANGE_MIN_PLAYERS_COUNT";
const BLUR_MIN_PLAYERS_COUNT = "BLUR_MIN_PLAYERS_COUNT";
const UPDATE_SUBS = "UPDATE_SUBS";
const DIVIDE_TEAMS = "DIVIDE_TEAMS";
const TOGGLE_RANDOM = "TOGGLE_RANDOM";
const CHANGE_TEAM_COLOR = "CHANGE_TEAM_COLOR";
const VALIDATE = "VALIDATE";
const CHECK_REPEATED_PLAYERS = "CHECK_REPEATED_PLAYERS";
const RESET_REPEATED_PLAYERS = "RESET_REPEATED_PLAYERS";
const REQUIRED = "REQUIRED";
const RESET_REQUIRED = "RESET_REQUIRED";
const CHECK_ENOUGH_PLAYERS = "CHECK_ENOUGH_PLAYERS";
const RESET_ENOUGH_PLAYERS = "RESET_ENOUGH_PLAYERS";

const initialState = {
  playerList: [], // { id: 1, name: player, subs: false, repeated: false,}
  teamsCount: 3,
  maxPlayersCount: 5,
  minPlayersCount: 2,
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
  teams: [], // { id: 1, title: title, squad: [], color: null, isSub: false,}
  isValid: false,
  error: { required: "Required", notEnoughPlayers: "", repeatedPlayers: "" },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_INPUT_TEXT:
      const arrPlayerList = convertTextToArr(action.value);
      if (arrPlayerList) {
        return {
          ...state,
          playerList: arrPlayerList.map((player, id) => {
            return {
              id: id + 1,
              name: player,
              subs: checkForSubsPlayers((id = id + 1), setMaxPlayers(state)),
              repeated: false,
            };
          }),
        };
      } else return { ...state, playerList: [] };
    case CHANGE_TEAMS_COUNT:
      return {
        ...state,
        teamsCount: action.value,
      };
    case BLUR_TEAMS_COUNT:
      return {
        ...state,
        teamsCount: action.value > 0 ? action.value : 3,
      };
    case CHANGE_MAX_PLAYERS_COUNT:
      return {
        ...state,
        maxPlayersCount: action.value,
      };
    case BLUR_MAX_PLAYERS_COUNT:
      return {
        ...state,
        maxPlayersCount: action.value > 0 ? action.value : 5,
      };
    case CHANGE_MIN_PLAYERS_COUNT:
      return {
        ...state,
        minPlayersCount: action.value,
      };
    case BLUR_MIN_PLAYERS_COUNT:
      return {
        ...state,
        minPlayersCount:
          action.value > 1 && action.value <= state.maxPlayersCount
            ? action.value
            : state.maxPlayersCount - 1,
      };
    case UPDATE_SUBS:
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
    case TOGGLE_RANDOM:
      return {
        ...state,
        // isRandom: action.value, // для checkbox
        isRandom: !state.isRandom, // для div
      };
    case DIVIDE_TEAMS: {
      if (state.isValid) {
        let restPlayersCount = state.playerList.length; // изначально кол-во оставшихся игроков равно списку;
        let nextPlayerIndex = 0; // индекс игрока, с которого надо добавлять в след.команду;
        let playerList = state.isRandom
          ? resetTeamColors(setShuffledList(state.playerList))
          : resetTeamColors(state.playerList); // JSON.parse(JSON.stringify(state.playerList)) - глубокая копия
        return {
          ...state,
          colorList: state.colorList.map((color) => ({
            ...color,
            usedById: null,
          })),
          teams: createNewTeams(state).map((team, i) => {
            // проверка на запасную команду. Т.к. i начинается с 0, утверждение будет верно только при наличии лишней (запасной) команды
            let isSubsTeam = +state.teamsCount === i;
            let restTeamsCount = state.teamsCount - i; // сколько осталось команд (для расчета кол-ва игроков при недоборе игроков)
            let computedPlayersCount; // количество игроков в каждую команду
            isSubsTeam // если есть запасные, они будут отображаться все в одной команде
              ? (computedPlayersCount = restPlayersCount)
              : (computedPlayersCount =
                  playerList.length < setMaxPlayers(state) // при недоборе в каждую итерацию кол-во игроков считается относительно
                    ? Math.ceil(restPlayersCount / restTeamsCount) // оставшегося количества игроков и команд для равномерного распределения
                    : +state.maxPlayersCount); // преобразование в число (иначе nextPlayerIndex складывается конкатенацией)

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
      } else return state;
    }
    case CHANGE_TEAM_COLOR: {
      const teamsColors = [...state.colorList]; // JSON.parse(JSON.stringify(state.colorList)) - глубокая копия
      const currentColor = teamsColors.find(
        (color) => color.usedById === action.teamId
      ); // ищем, используется ли цвет командой
      if (currentColor) {
        // если используется
        const currentIdx = teamsColors.indexOf(currentColor); // определяем индекс объекта цвета
        teamsColors[currentIdx].usedById = null; // обнуляем текущий цвет
        setNextTeamColor(currentIdx + 1, teamsColors, action.teamId); // устанавливаем цвет на ближайший пустой после текущего
      } else {
        // если не используется
        setNextTeamColor(0, teamsColors, action.teamId); // устанавливаем цвет на ближайший пустой с начала списка
      }
      return {
        ...state,
        colorList: [...teamsColors],
        teams: state.teams.map((team) => {
          // обнуляем текущий цвет у команды (если не обнулить, цвет команды не будет заменяться
          team.color = null; // на прозрачный в конце, а последний цвет массива будет оставаться 2 щелчка)
          state.colorList.forEach((color) => {
            // если в списке цветов цвет занят командой,
            if (color.usedById === team.id) {
              // находим его
              team.color = color.color; // и устанавливаем нужный цвет команде
            }
          });
          return { ...team };
        }),
      };
    }
    case VALIDATE: {
      const isErrors = () => {
        for (let key in state.error) {
          if (state.error[key]) {
            return false;
          }
        }
        return true;
      };
      return {
        ...state,
        isValid: isErrors(),
      };
    }
    case CHECK_REPEATED_PLAYERS: {
      const repeatedPlayers = state.playerList.map((player, idx) => {
        if (
          state.playerList.find((samePlayer, i) => {
            return (
              samePlayer.name.toUpperCase() === player.name.toUpperCase() &&
              i > idx
            );
          })
        ) {
          return {
            ...player,
            repeated: true,
          };
        } else {
          return {
            ...player,
            repeated: false,
          };
        }
      });
      return {
        ...state,
        error: {
          ...state.error,
          repeatedPlayers: repeatedPlayers.find((player) => player.repeated)
            ? "Повторяющиеся игроки"
            : "",
        },
      };
    }
    case RESET_REPEATED_PLAYERS:
      return {
        ...state,
        error: { ...state.error, repeatedPlayers: "" },
      };
    case REQUIRED:
      return {
        ...state,
        error: { ...state.error, required: action.text ? "" : "Required" },
      };
    case RESET_REQUIRED:
      return {
        ...state,
        error: { ...state.error, required: "" },
      };
    case CHECK_ENOUGH_PLAYERS:
      return {
        ...state,
        error: {
          ...state.error,
          notEnoughPlayers:
            state.playerList.length < state.teamsCount * state.minPlayersCount
              ? `Недостаточно игроков. Минимальное количество - ${
                  state.teamsCount * state.minPlayersCount
                }`
              : "",
        },
      };
    case RESET_ENOUGH_PLAYERS:
      return {
        ...state,
        error: { ...state.error, notEnoughPlayers: "" },
      };
    default:
      return state;
  }
};

export default reducer;

//* ActionCreators
export const inputTextCreator = (text) => {
  return { type: ON_INPUT_TEXT, value: text };
};
export const teamCountCreator = (count) => {
  return { type: CHANGE_TEAMS_COUNT, value: count };
};
export const maxPlayersCountCreator = (count) => {
  return { type: CHANGE_MAX_PLAYERS_COUNT, value: count };
};
export const minPlayersCountCreator = (count) => {
  return { type: CHANGE_MIN_PLAYERS_COUNT, value: count };
};
export const teamBlurCreator = (count) => {
  return { type: BLUR_TEAMS_COUNT, value: count };
};
export const maxPlayersBlurCreator = (count) => {
  return { type: BLUR_MAX_PLAYERS_COUNT, value: count };
};
export const minPlayersBlurCreator = (count) => {
  return { type: BLUR_MIN_PLAYERS_COUNT, value: count };
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
export const toggleRandomCreator = () => {
  return { type: TOGGLE_RANDOM };
};
export const validateInputs = () => {
  return { type: VALIDATE };
};
export const checkRepeatedPlayers = () => {
  return { type: CHECK_REPEATED_PLAYERS };
};
export const resetRepeatedPlayers = () => {
  return { type: RESET_REPEATED_PLAYERS };
};
export const required = (text) => {
  return { type: REQUIRED, text };
};
export const resetRequired = () => {
  return { type: RESET_REQUIRED };
};
export const checkEnoughPlayers = () => {
  return { type: CHECK_ENOUGH_PLAYERS };
};
export const resetEnoughPlayers = () => {
  return { type: RESET_ENOUGH_PLAYERS };
};

//* ThunkCreators
export const onInputChangeTC = (text) => (dispatch) => {
  dispatch(inputTextCreator(text));
  dispatch(updateSubsCreator());
  dispatch(required(text));
};
export const onInputBlurTC = () => (dispatch) => {
  dispatch(checkEnoughPlayers());
  dispatch(checkRepeatedPlayers());
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
const checkForSubsPlayers = (playerId, setMaxPlayers) => {
  return playerId > setMaxPlayers ? true : false;
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
  if (state.playerList.length > setMaxPlayers(state)) {
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
const setMaxPlayers = (state) => {
  return state.teamsCount * state.maxPlayersCount;
};
// алгоритм Фишера-Йейтса - Fisher–Yates shuffle
const setShuffledList = (list) => {
  let mainList = list.filter((player) => !player.subs);
  let subList = list.filter((player) => player.subs);
  for (var i = mainList.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [mainList[randomIndex], mainList[i]] = [mainList[i], mainList[randomIndex]];
  }
  return [...mainList, ...subList];
};
// установка цвета на ближайший незанятый элемент массива
const setNextTeamColor = (startIdx, colorList, teamId) => {
  for (let i = startIdx; i < colorList.length; i++) {
    if (colorList[i].usedById === null) {
      colorList[i].usedById = teamId;
      break;
    }
  }
};
// обнуление цветов команд для каждого нового деления
const resetTeamColors = (playerList) => {
  return playerList.map((player) => ({ ...player, color: null }));
};
