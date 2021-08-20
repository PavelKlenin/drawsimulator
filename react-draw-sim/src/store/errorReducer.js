import * as CONST from "./consts";

const initialState = {
  isValid: false,
  error: {
    reqiuredPlayers: { isValid: false, message: "" },
    repeatedPlayers: { isValid: true, message: "" },
    filledBasket: { isValid: true, message: "" },
  },
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONST.CHECK_VALIDATION: {
      const isErrors = () => {
        for (let key in state.error) {
          if (!state.error[key].isValid) {
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
    case CONST.CHECK_FOR_REPEATED_PLAYERS: {
      return {
        ...state,
        error: {
          ...state.error,
          repeatedPlayers: {
            ...state.error.repeatedPlayers,
            isValid: !action.playerList.some((player) => player.repeated),
            message: action.playerList.some((player) => player.repeated)
              ? "Повторяющиеся игроки"
              : "",
          },
        },
      };
    }
    case CONST.CHECK_REQUIRED_PLAYERS:
      return {
        ...state,
        error: {
          ...state.error,
          reqiuredPlayers: {
            ...state.error.reqiuredPlayers,
            isValid:
              action.data.playerList.length >= action.data.minPlayersCount,
            message: (
              <pre>
                {`Недостаточно игроков.\nМинимальное количество - ${action.data.minPlayersCount}`}
              </pre>
            ),
          },
        },
      };
    case CONST.CHECK_BASKET_LENGTH_ERR:
      const { playerList, totalTeams } = { ...action.data };
      return {
        ...state,
        error: {
          ...state.error,
          filledBasket: {
            ...state.error.filledBasket,
            isValid: !playerList.some((player) => player.overflowed)
              ? true
              : false,
            message: !playerList.some((player) => player.overflowed)
              ? ""
              : `Максимум игроков в каждой группе - ${totalTeams}`,
          },
        },
      };
    default:
      return state;
  }
};

export default errorReducer;
