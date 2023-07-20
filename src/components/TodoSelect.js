import { React, useState } from "react";
import "./TodoSelect.css"


const TodoSelect = ({ todos }) => {

    const [Selected, setSelected] = useState("all");
    const handleSelect = (e) => {
      setSelected(e.target.value);
    };
    
    return (
        <div>
          <select onChange={handleSelect}>
            <option>{Selected}</option>
            {todos.map((todo) => (
              <option value={todo.username} key={todo.id}>
                {todo.username}
              </option>
            ))}
          </select>
        </div>
    );
};

export default TodoSelect;
