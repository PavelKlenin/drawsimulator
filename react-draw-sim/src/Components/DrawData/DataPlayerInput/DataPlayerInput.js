import { useRef, useState, React } from "react";
import "../DrawData.scss";

const DataPlayerInput = (props) => {
  const [rows, setRows] = useState(0);
  const showMsg = useRef();

  !props.error.isValid &&
    props.isFocused &&
    setTimeout(() => showMsg.current.scrollIntoView(), 500);

  const onInputChange = (e) => {
    props.onInputChangeTC(e.target.value);
    setRows(e.target.value.split("\n").length);
  };
  const onInputBlur = () => {
    props.onInputBlur(false);
  };
  const onInputFocus = () => {
    props.toggleFocus(true);
  };
  return (
    <div className="playerInput">
      <p className="errors" ref={showMsg}>
        {!props.error.isValid && !props.isFocused && props.error.message}
      </p>
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
