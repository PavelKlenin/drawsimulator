import { useState, React } from "react";
import "../DrawData.scss";

const DataPlayerInput = (props) => {
  const [rows, setRows] = useState(0);

  props.error.message && window.scrollTo(0, 0);

  const onInputChange = (e) => {
    props.onInputChangeTC(e.target.value);
    setRows(e.target.value.split("\n").length);
  };
  const onInputBlur = (e) => {
    props.onInputBlurTC();
  };
  const onInputFocus = (e) => {
    props.onInputFocus(e.target.value);
  };
  return (
    <div className="playerInput">
      <p className="errors">{props.error.message}</p>
      <textarea
        rows={rows}
        onChange={onInputChange}
        onBlur={onInputBlur}
        onFocus={onInputFocus}
        className="list"
        placeholder="Список участников"
      />
    </div>
  );
};

export default DataPlayerInput;
