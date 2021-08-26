import { React } from "react";
import "../DrawData.scss";

const DataCountInput = (props) => {
  const onChangeValue = (e) => {
    props.onCountChange(e.target.value);
  };
  const onBlur = (e) => {
    props.onCountBlur(e.target.value);
  };
  const onFocus = () => {
    props.toggleFocus && props.toggleFocus(true);
  };

  return (
    <div className={props.className}>
      <span className="conditions_text">{props.title}</span>
      <input
        onChange={onChangeValue}
        onBlur={onBlur}
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
