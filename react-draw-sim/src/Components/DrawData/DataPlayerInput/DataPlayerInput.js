import { useRef, useState, React } from "react";
import "../DrawData.scss";

const DataPlayerInput = (props) => {
  const [rows, setRows] = useState(0);
  const helpMsg = useRef();

  if (!props.error.isValid && props.error.showErr) {
    helpMsg.current.scrollIntoView({ block: "center" });
  }

  const onInputChange = (e) => {
    props.onInputChangeTC(e.target.value);
    setRows(e.target.value.split("\n").length);
  };
  const onInputBlur = () => {
    props.onInputBlur(false);
  };
  const onInputFocus = () => {
    props.toggleFocus(true);
    helpMsg.current.scrollIntoView();
  };
  return (
    <div className="playerInput">
      <p className="errors" ref={helpMsg}>
        {!props.error.isValid && props.error.showErr && props.error.message}
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
