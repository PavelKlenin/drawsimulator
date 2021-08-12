import { React } from "react";
import "../DrawData.scss";

const DataCountInput = (props) => {
  const onChangeValue = (e) => {
    props.changeCountCreator(e.target.value);
  };
  const onBlurValue = (e) => {
    props.blurCountCreator(e.target.value);
  }
  return (
    <div className={props.className}>
      <span className="conditions_text">{props.title}</span>
      <input
        onChange={onChangeValue}
        onBlur={onBlurValue}
        onFocus={props.onFocus}
        className={`${props.inputClassName} conditions_count`}
        type="text"
        maxLength={props.maxLength}
        value={props.value}
      />
    </div>
  );
};

export default DataCountInput;
