import { initialState } from './libs/data';
import { useState } from 'react';
import './App.css';

function App() {
  const [todos] = useState(initialState);
  console.log(todos)
  return (
    <div className="App">
      {todos.map((todo, index) => (
        <div className="wrap">
          <input 
            type="checkbox" 
            checked="" 
            id={todo.id} 
            title={todo.title} 
            onChange={()=> console.log(1111) } 
          />
          <div className="type">{todo.type}</div>
          <div className="text">{todo.text}</div>
          <button type=''></button>
        </div>
    ))}
    </div>
  );
}

export default App;
