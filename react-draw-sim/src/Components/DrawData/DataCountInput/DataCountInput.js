import { useRef, React } from "react";
import "../DrawData.scss";

const DataCountInput = (props) => {
  const inputTeams = useRef();
  const onChangeValue = (e) => {
    props.changeCountCreator(e.target.value);
  };
  const onBlurValue = (e) => {
    props.blurCountCreator(e.target.value);
  };
  const onFocus = () => {
    // колбэк отрабатывается только для поля, от которого зависит наличие ошибки
    if (props.onFocus) {
      props.onFocus();
      // чтобы раньше времени не прокручивалось на ошибку, если изменяем поле
      // команд, т.к. количество команд влияет на наличие ошибки
      props.error && inputTeams.current.scrollIntoView(); //! сделать через общий параметр onFocused
    }
  };
  return (
    <div className={props.className}>
      <span className="conditions_text">{props.title}</span>
      <input
        ref={inputTeams}
        onChange={onChangeValue}
        onBlur={onBlurValue}
        onFocus={onFocus}
        className={`${props.inputClassName} conditions_count`}
        type="text"
        maxLength={props.maxLength}
        value={props.value}
      />
    </div>
  );
};

export default DataCountInput;
