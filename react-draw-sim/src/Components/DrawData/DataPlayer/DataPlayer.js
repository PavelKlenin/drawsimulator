import { useState, React } from "react";
import "../DrawData.scss";
import InfoIcon from "./../../common/InfoIcon";

const DataPlayer = (props) => {
  const [clicked, setClicked] = useState(false);

  const onPlayerClick = () => {
    if (!error) {
      props.onPlayerClick(props.id);
      setClicked(true); 
    }
  };

  const error = props.error.repeatedPlayers.isValid ? false : true;

  return (
    <p
      className={`player ${props.subs || error ? "disabledPlayer" : ""}  ${
        props.repeated || props.filledBasket ? "errorPlayer" : ""
      }`}
      onClick={onPlayerClick}>
      {props.name}
      {props.basket > 0 ? (
        <span className={`basket basket${props.basket}`}>{props.basket}</span>
      ) : (
        !error &&
        !clicked &&
        props.id === 1 && <InfoIcon tipName={props.basketTipName} />
        // иконка появляется только у первого игрока и скрывается при нажатии на
        // поле игрока, когда выводится значение "корзины" (и при наличии ошибки
        // поля игрока), т.к. подсказка больше не нужна
      )}
    </p>
  );
};

export default DataPlayer;
