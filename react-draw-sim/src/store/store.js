const ON_INPUT_TEXT = "ON_INPUT_TEXT";
const CHANGE_TEAMS_COUNT = "CHANGE_TEAMS_COUNT";
const CHANGE_PLAYERS_COUNT = "CHANGE_PLAYERS_COUNT";
const BLUR_TEAMS_COUNT = "BLUR_TEAMS_COUNT";
const BLUR_PLAYERS_COUNT = "BLUR_PLAYERS_COUNT";

// const DIVIDE_TEAMS = "DIVIDE_TEAMS";

const store = {
  _state: {
    playerList: [],
    teamsCount: 3,
    playersCount: 5,
    teams: [],
  },
  _callSubscriber() {},
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    switch (action.type) {
      case ON_INPUT_TEXT:
        const arrPlayerList = charToArr(action.value);
        let playerList = [];
        if (arrPlayerList) {
          playerList = arrPlayerList.map((player, id) => {
            return { id: id + 1, name: player, subs: false };
          });
        }
        this._state.playerList = playerList;
        this._callSubscriber(this._state);
        break;
      case CHANGE_TEAMS_COUNT:
        this._state.teamsCount = action.value;
        this._callSubscriber(this._state);
        break;
      case CHANGE_PLAYERS_COUNT:
        this._state.playersCount = action.value;
        this._callSubscriber(this._state);
        break;
      case BLUR_PLAYERS_COUNT:
        action.value > 0
          ? (this._state.playersCount = action.value)
          : (this._state.playersCount = 5);
        this._callSubscriber(this._state);
        break;
      case BLUR_TEAMS_COUNT:
        action.value > 0
          ? (this._state.teamsCount = action.value)
          : (this._state.teamsCount = 3);
        this._callSubscriber(this._state);
        break;
      default:
        break;
    }
  },
};

export default store;

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
