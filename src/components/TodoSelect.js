import React from "react";
import "./TodoSelect.css"


const TodoSelect = ({options, onChangeUser}) => {
    return (
        <div>
          <select options={options} onChangeUser={onChangeUser}>
            <option value="" selected disabled hidden>유저를 선택하세요</option>
            <option>111</option>
            <option>222</option>
            <option>333</option>
          </select>
        </div>
    );
};

export default TodoSelect;
