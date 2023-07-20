import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.css';

// App.js에서 props 받아오기
const TodoList = ({ todos, onRemove, onToggle, completed }) => {
    
    return (
        <>
            {/* todos에서 category 체크해서 뿌려줘야하는데 */}
            <h2 className='TodoList-title'>{ todos.category }</h2>
            <ul className="TodoList">
                {todos.map(todo => (
                    <TodoListItem 
                        todo={todo} key={todo.id} 
                        onRemove={onRemove} 
                        onToggle={onToggle} 
                        completed={completed} 
                    />
                ))}
            </ul>
        </>
    )
}

export default TodoList;