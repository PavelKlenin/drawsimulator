import { React } from "react";
import "../DrawData.scss";

const DataPlayerInput = (props) => {
  const onInputChange = (e) => {
    props.onInputChangeTC(e.target.value);
  };
  const onInputBlur = () => {
    props.onInputBlurTC();
  };
  const onInputFocus = (e) => {
    props.onInputFocus(e.target.value);
  };
  return (
    <div className='playerInput'>
      <p className="errors">{props.error}</p>
      <textarea
        //TODO изменение размера при вводе
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
