const TodoList = ({ 
  todos,
  onEdit,
  onDelete,
  checkedTodos,
  setCheckedTodos
}) => {
  return (
    <div className="list-area">
      {todos.map(todo => {
        const isChecked = checkedTodos.includes(todo.id); // 체크 상태 확인
        return (
          <div className="todo-item" key={todo.id}>
            <input
              type="checkbox"
              id={`ck-${todo.id}`}
              className="todo-checkbox"
              checked={isChecked}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedTodos(prev => [...prev, todo.id]);
                } else {
                  setCheckedTodos(prev => prev.filter(id => id !== todo.id));
                }
              }}
            />
            <label htmlFor={`ck-${todo.id}`}>{todo.type}</label>
            <strong>{todo.title}</strong>
            <span>{todo.desc}</span>
            <button onClick={() => onEdit(todo, isChecked)}>수정</button>
            <button onClick={() => onDelete(todo, isChecked)}>삭제</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;