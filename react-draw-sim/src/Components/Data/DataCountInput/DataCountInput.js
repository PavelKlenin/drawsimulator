import { React } from "react";
import "../Data.css";

const DataCountInput = (props) => {
  const onChangeValue = (e) => {
    props.changeCountCreator(e.target.value);
    props.updateSubsCreator();
  };
  const onBlurValue = (e) => {
    props.blurCountCreator(e.target.value);
    props.updateSubsCreator();
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

export default DataCountInput;
