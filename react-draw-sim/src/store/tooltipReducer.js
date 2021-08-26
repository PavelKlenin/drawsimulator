export const PLAYER_BASKET_TIP = "PLAYER_BASKET_TIP";
export const TEAM_COLOR_TIP = "TEAM_COLOR_TIP";

const initialState = {
  tooltips:[
    {
      id: 1,
      name: PLAYER_BASKET_TIP,
      tipText:
        "Изменить «корзину» участника<br/>(для «рейтинговой» жеребьёвки<br/>с предварительным «посевом»)",
    },
    {
      id: 2,
      name: TEAM_COLOR_TIP,
      tipText: "Изменить цвет команды",
    },
  ],
} 
const tooltipReducer = (state = initialState) => {
  return state;
}
export default tooltipReducer;
