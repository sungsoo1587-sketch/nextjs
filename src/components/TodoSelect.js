import { React, useState } from "react";
import "./TodoSelect.css"


const TodoSelect = () => {

  // app.js에 todos 배열에서 뽑아오고 싶은데..
  const userList = [
    {
      id: 1,
      username: 'all',
      
    },
    {
      id: 2,
      username: '문상훈',

    },
    {
        id: 3,
        username: '우영우',
    },
    {
        id: 4,
        username: '나선욱',
        
    },
  ];
  const [Selected, setSelected] = useState("");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
    return (
        <div>
          <select onChange={handleSelect} defaultValue={Selected}>
          {/* app.js에 todos에서 뽑아오고 싶은데.. */}
            {userList.map((user) => (
              <option value={user.username} key={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
    );
};

export default TodoSelect;
