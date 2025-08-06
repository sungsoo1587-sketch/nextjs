import {BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom';

import { useState } from 'react';
import { initialState, typeSelects } from './libs/data';

import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import MakeReservation from './components/MakeReservation';

import './App.css';

function TodoPage() {
  const [todos, setTodos] = useState(initialState);
  const [isModify, setModify] = useState();
  const [types] = useState(typeSelects);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    text: '',
  });
  const [modifyFormData, setModifyFormData] = useState({
    type: '',
    title: '',
    text: '',
  });

  const toggleDone = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const buttonAdd = () => {
    const nextId =
      todos.length > 0
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
    setFormData({ type: '', title: '', text: '' });
  };

  const buttonModify = (todo) => {
    if (todo && todo.done === false) {
      alert('체크박스 선택해야함');
      return;
    }
    setModify(todo);
    setModifyFormData({
      type: todo.type,
      title: todo.title,
      text: todo.text,
    });
  };

  const applyModify = () => {
    if (!isModify) return;

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === isModify.id
          ? { ...todo, ...modifyFormData }
          : todo
      )
    );
    setModify(null);
    setModifyFormData({ type: '', title: '', text: '' });
  };

  const buttonDel = (todo) => {
    if (todo && todo.done === false) {
      alert('체크박스 선택해야함');
      return;
    }
    setTodos(prevTodos =>
      prevTodos.filter(item => item.id !== todo.id)
    );
  };

  return (
    <>
      <TodoForm
        formData={formData}
        types={types}
        handleInputChange={(e) => {
          const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));
        }}
        onSubmit={buttonAdd}
        buttonTxt="추가"
      />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleDone={toggleDone}
          onModify={buttonModify}
          onDelete={buttonDel}
        />
      ))}

      {isModify && (
        <TodoForm
          formData={modifyFormData}
          types={types}
          handleInputChange={(e) => {
            const { name, value } = e.target;
            setModifyFormData(prev => ({ ...prev, [name]: value }));
          }}
          onSubmit={applyModify}
          buttonTxt="수정완료"
        />
      )}
    </>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">할일 목록</Link> |{' '}
          <Link to="/MakeReservation">프로그램 예약하기</Link>
        </nav>
        <hr />

        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/MakeReservation" element={<MakeReservation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
