import React from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.css';

const TodoInsert = ({ username, text, onSubmit, onChange, onInsert }) => {

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input className='userInput' placeholder="이름을 입력하세요"
                value={username}   
                onChange={onChange}
                name='username'
            />
            <input placeholder="텍스트를 입력하세요"
                value={text}
                onChange={onChange}
                name='text'
            />
            <button type="submit" onClick={onInsert}>
                <MdAdd />
            </button>
        </form>
    )
}
export default TodoInsert;