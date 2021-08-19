import * as CONST from "./consts";

const initialState = {
  isValid: false,
  error: {
    required: { isValid: false, message: "Required" },
    notEnoughPlayers: { isValid: false, message: "" },
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
          },
        },
      };
    }
    case CONST.SET_REPEATED_ERR_MSG: {
      return {
        ...state,
        error: {
          ...state.error,
          repeatedPlayers: {
            ...state.error.repeatedPlayers,
            message: !state.error.repeatedPlayers.isValid
              ? "Повторяющиеся игроки"
              : "",
          },
        },
      };
    }
    case CONST.RESET_REPEATED_ERR_MSG:
      return {
        ...state,
        error: {
          ...state.error,
          repeatedPlayers: { ...state.error.repeatedPlayers, message: "" },
        },
      };
    case CONST.CHECK_FOR_REQUIRED:
      return {
        ...state,
        error: {
          ...state.error,
          required: {
            ...state.error.required,
            isValid: action.text ? true : false,
            message: action.text ? "" : "Required",
          },
        },
      };
    case CONST.RESET_REQUIRED_ERR_MSG:
      return {
        ...state,
        error: {
          ...state.error,
          required: { ...state.error.required, message: "" },
        },
      };
    case CONST.CHECK_FOR_ENOUGH_PLAYERS:
      return {
        ...state,
        error: {
          ...state.error,
          notEnoughPlayers: {
            ...state.error.notEnoughPlayers,
            isValid:
              action.data.playerList.length >= action.data.minPlayersCount,
          },
        },
      };
    case CONST.SET_NOT_ENOUGH_ERR_MSG:
      return {
        ...state,
        error: {
          ...state.error,
          notEnoughPlayers: {
            ...state.error.notEnoughPlayers,
            message: !state.error.notEnoughPlayers.isValid ? (
              <pre>
                {`Слишком мало игроков.\nМинимальное количество - ${action.minPlayersCount}`}
              </pre>
            ) : (
              ""
            ),
          },
        },
      };
    case CONST.RESET_NOT_ENOUGH_ERR_MSG:
      return {
        ...state,
        error: {
          ...state.error,
          notEnoughPlayers: { ...state.error.notEnoughPlayers, message: "" },
        },
      };
    case CONST.SET_BASKET_LENGTH_ERR:
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
              : `Максимум ${totalTeams} игроков в каждой группе`,
          },
        },
      };
    default:
      return state;
  }
};

export default errorReducer;
