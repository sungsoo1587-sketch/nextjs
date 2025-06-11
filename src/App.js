import { initialState } from './libs/data';
import { typeSelects } from './libs/data';
import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState(initialState);
  const [isModify, setModify] = useState();
  const [types] = useState(typeSelects);  
  const [formData, setFormData] = useState({ // 추가용
    type: '',
    title: '',
    text: '',
  })
  const [modifyFormData, setModifyFormData] = useState({ // 수정용
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
  };
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => {
  //     const updated = { ...prev, [name]: value };
  //     //console.log(updated);
  //     return updated;
  //   });
    
  // };
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
    setFormData({ id:'', type: '', title: '', text: '' });
  }

  const buttonModify = (todo) => {
    if (todo && todo.done === false) {
      alert('체크박스 선택해야함');
      return;
    }
    console.log('수정',todo)
    setModify(todo)
    setModifyFormData({
      type: todo.type,
      title: todo.title,
      text: todo.text,
    });
  }

  const applyModify = () => {
    if (!isModify) return;

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === isModify.id
          ? { ...todo, ...modifyFormData }
          : todo
      )
    );
    //수정완료 후 초기화
    setModify(null);
    setModifyFormData({ type: '', title: '', text: '' });
  };
  const buttonDel = (todo) => {
    console.log(todo)
    if (todo && todo.done === false) {
      alert('체크박스 선택해야함')
      return
    }

    setTodos(prevTodos =>
      prevTodos.filter(item => item.id !== todo.id) // 현재 항목의 ID가 삭제하려는 항목의 ID와 같지 않으면(true) 이 항목 남기고 아닌거 삭제
    )
  }

  
  return (
    <div className="App">
      <TodoForm
        formData={formData}
        types={types}
        handleInputChange={(e) => {
          const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));
        }}
        onSubmit={buttonAdd}
        isModify='{false}'
        buttonTxt='추가'
      />
      
       {/* <div className="wrap_add">
        <select title="타입 선택" name="type" value={formData.type} onChange={handleInputChange}>
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
      </div>  */}
      

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleDone={toggleDone}
          onModify={buttonModify}
          onDelete={buttonDel}
        />
        /*
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
            onClick={()=> buttonModify(todo) } 
          >수정</button>
          <button type="button"
            onClick={()=> buttonDel(todo)}
          >삭제</button>
        </div>
        */
        
    ))}
    {isModify &&(
      <TodoForm
        formData={modifyFormData}
        types={types}
        handleInputChange={(e) => {
          const { name, value } = e.target;
          setModifyFormData(prev => ({ ...prev, [name]: value }));
        }}
        onSubmit={applyModify}
        isModify={true}
        buttonTxt='수정완료'
      />
      /*
      <div className="wrap_add">
        <select title="타입 선택" name="type" value={formData.type} onChange={handleInputChange}>
          <option value="">타입을 선택하세요</option>
          {types.map((type) =>(
            <option value={type}>{type}</option>
          ))}
        </select>
        <input type="text" name="title" placeholder="타이틀 입력"onChange={handleInputChange} />
        <input type="text" name="text" placeholder="설명 입력"onChange={handleInputChange} />
        <button type="button"
            onClick={()=> applyModify() } 
          >수정완료</button>
      </div>
      */
    )}
    </div>
  );
}

export default App;
