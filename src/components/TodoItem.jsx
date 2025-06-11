import React from 'react';
function TodoItem({ todo, toggleDone, onModify, onDelete }) {
  return (
    <div className={`wrap_${todo.id}`} key={todo.id}>
      <input
        type="checkbox"
        checked={todo.done}
        id={`ck_${todo.id}`}
        onChange={() => toggleDone(todo.id)}
      />
      <div className="type">{todo.type}</div>
      <div className="text">{todo.title}</div>
      <div className="text">{todo.text}</div>
      <button type="button" onClick={() => onModify(todo)}>수정</button>
      <button type="button" onClick={() => onDelete(todo)}>삭제</button>
    </div>
  );
}
export default TodoItem;