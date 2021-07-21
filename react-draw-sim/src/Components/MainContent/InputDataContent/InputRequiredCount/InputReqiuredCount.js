import { React } from "react";
import "../InputData.css";

const InputReqiuredCount = (props) => {
  const onChangeValue = (e) => {
    props.dispatch(props.changeCountCreator(e.target.value));
  };
  const onBlurValue = (e) => {
    props.dispatch(props.blurCountCreator(e.target.value));
  }
  return (
    <div className={props.className}>
      <span className="conditions_text">{props.title}</span>
      <input
        onChange={onChangeValue}
        onBlur={onBlurValue}
        className={`${props.inputClassName} conditions_count`}
        type="text"
        maxLength={props.maxLength}
        value={props.value}
      />
    </div>
  );
};

export default InputReqiuredCount;
