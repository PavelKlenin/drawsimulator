import * as CONST from "./consts";

const initialState = {
  preparedList: [],
  colorList: [
    { id: 1, color: "teamRed", usedById: null },
    { id: 2, color: "teamOrange", usedById: null },
    { id: 3, color: "teamBlue", usedById: null },
    { id: 4, color: "teamGreen", usedById: null },
    { id: 5, color: "teamGreenYellow", usedById: null },
    { id: 6, color: "teamBlack", usedById: null },
    { id: 7, color: "teamWhite", usedById: null },
  ],
  teams: [], // { id: 1, title: title, squad: [], color: null, isSub: false,}
};

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONST.PREPARE_PLAYERLIST: {
      const { playerList, isRandom } = { ...action.data };
      return {
        ...state,
        preparedList: isRandom ? shuffledList(playerList) : [...playerList],
      };
    }
    case CONST.PREPARE_BASKET_LIST: {
      const { playerList, isRandom } = action.data;
      let basket,
        basketList = [];
      for (let i = 1; i <= 5; i++) {
        i === 5
          ? (basket = playerList.filter((player) => player.basket === 0)) // чтобы игроки из корзины 0 были в конце списка
          : (basket = playerList.filter((player) => player.basket === i));
        if (basket) {
          basketList = [...basketList, basket];
        }
      }
      return {
        ...state,
        preparedList: isRandom
          ? basketList.reduce(
              (baskets, basket) => [...baskets, ...shuffledList(basket)],
              []
            )
          : basketList.reduce((baskets, basket) => [...baskets, ...basket], []),
      };
    }
    case CONST.DIVIDE_BASKET_TEAMS: {
      const { totalTeams, maxPlayersInTeam } = { ...action.data };
      let teams = createNewTeams({
        playerList: state.preparedList,
        totalTeams,
        maxPlayersInTeam,
      });
      state.preparedList.forEach((player, idx) => {
        if (!player.subs) {
          const teamIdx = (totalTeams + idx) % totalTeams;
          teams[teamIdx].squad = [...teams[teamIdx].squad, player];
        } else {
          teams[totalTeams].squad = [
            ...teams[totalTeams].squad,
            player,
          ];
        }
      });
      return {
        ...state,
        teams,
      };
    }
    case CONST.RESET_TEAM_COLORS:
      return {
        ...state,
        colorList: state.colorList.map((color) => ({
          ...color,
          usedById: null,
        })),
      };
    case CONST.DIVIDE_TEAMS: {
      const preparedList = [...state.preparedList];
      const { totalTeams, maxPlayersInTeam } = { ...action.data };
      let restPlayersCount = preparedList.length; // изначально кол-во оставшихся игроков равно списку;
      let nextPlayerIndex = 0; // индекс игрока, с которого надо добавлять в след.команду;
      return {
        ...state,
        teams: createNewTeams({
          playerList: preparedList,
          totalTeams,
          maxPlayersInTeam,
        }).map((team, i) => {
          // проверка на запасную команду. Т.к. i начинается с 0, утверждение будет верно только при наличии лишней (запасной) команды
          let isSubsTeam = +totalTeams === i;
          let restTeamsCount = totalTeams - i; // сколько осталось команд (для расчета кол-ва игроков при недоборе игроков)
          let computedPlayersCount; // количество игроков в каждую команду
          isSubsTeam // если есть запасные, они будут отображаться все в одной команде
            ? (computedPlayersCount = restPlayersCount)
            : (computedPlayersCount =
                preparedList.length < setMaxPlayers(action.data) // при недоборе в каждую итерацию кол-во игроков считается относительно
                  ? Math.ceil(restPlayersCount / restTeamsCount) // оставшегося количества игроков и команд для равномерного распределения
                  : +maxPlayersInTeam); // преобразование в число (иначе nextPlayerIndex складывается конкатенацией)

          // добавление игроков в команду
          for (
            let i = nextPlayerIndex;
            i < nextPlayerIndex + computedPlayersCount;
            i++
          ) {
            // проверка на наличие игрока, чтобы запасная команда не наполняла команду underfined-игроками
            team.squad = [...team.squad, preparedList[i]];
          }
          restPlayersCount = restPlayersCount - computedPlayersCount; // для след.итераций из оставшихся игроков вычитается кол-во игроков в команде
          nextPlayerIndex = nextPlayerIndex + computedPlayersCount; // индекс для след.команды равен сумме всех игроков из предыдущих команд
          return team;
        }),
      };
    }
    case CONST.CHANGE_TEAM_COLOR: {
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
    default:
      return state;
  }
};

export default teamsReducer;

//* Additional functions
const createNewTeams = (state) => {
  let teams = [];
  // добавление пустых команд по количеству команд (state.totalTeams)
  for (let i = 0; i < state.totalTeams; i++) {
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
  return state.totalTeams * state.maxPlayersInTeam;
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
// установка цвета на ближайший незанятый элемент массива
const setNextTeamColor = (startIdx, colorList, teamId) => {
  for (let i = startIdx; i < colorList.length; i++) {
    if (colorList[i].usedById === null) {
      colorList[i].usedById = teamId;
      break;
    }
  }
};
