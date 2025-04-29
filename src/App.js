import { initialState } from './libs/data';
import { typeSelects } from './libs/data';
import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(initialState);
  const [types] = useState(typeSelects);  
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    text: '',
  })
  const toggleDone = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
    console.log(todos)
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      console.log(updated);
      return updated;
    });
  };
  const buttonAdd = ()=>{
    const nextId = todos.length > 0
    ? Math.max(...todos.map(todo => todo.id)) + 1
    : 1;
    const newTodo = {
      id: nextId,
      type: formData.type,
      title: formData.title,
      text: formData.text,
      done: false
    };
    setTodos(prev => [...prev, newTodo]);
    setFormData({ id:nextId, type: formData.type, title: formData.title, text: formData.text });
    console.log(setTodos)
  }

  const buttonModify = (id) => {
    console.log(`수정${id}`)
  }
  const buttonDel = (id) => {
    setTodos(prevTodos =>
      prevTodos.filter(todo => todo.id !== id || todo.done === false)
      
    )
  }

  
  return (
    <div className="App">
      <div className="wrap_add">
        <select title="타입 선택" name="type" value={formData.type}
  onChange={handleInputChange}>
    <option value="">타입을 선택하세요</option>
          {types.map((type) =>(
            <option value={type}>{type}</option>
          ))}
        </select>
        <input type="text" name="title" placeholder="타이틀 입력"onChange={handleInputChange} />
        <input type="text" name="text" placeholder="설명 입력"onChange={handleInputChange} />
        <button type="button"
            onClick={()=> buttonAdd() } 
          >추가</button>
      </div>
      {todos.map((todo, index) => (
        <div className={`wrap_${todo.id}`} key={todo.id}>
          <input 
            type="checkbox" 
            checked={todo.done}
            id={`ck_${todo.id}`} 
            onChange={()=> toggleDone(todo.id) } 
          />
          <div className="type">{todo.type}</div>
          <div className="text">{todo.title}</div>
          <div className="text">{todo.text}</div>
          <button type="button"
            onClick={()=> buttonModify(todo.id) } 
          >수정</button>
          <button type="button"
            onClick={()=> buttonDel(todo.id)}
          >삭제</button>
        </div>
        
    ))}
    </div>
  );
}

export default App;
