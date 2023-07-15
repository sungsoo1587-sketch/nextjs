import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.css';

const TodoInsert = ({ onInsert }) => {
    // const [value, setValue] = useState('');
    const [inputs, setInputs] = useState({
        name: '',
        content: ''
    });
    
    const { name, content } = inputs; // 비구조화 할당을 통해 값 추출

    const onChange = useCallback(e => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
        });
    }, [inputs]);

    const onSubmit = useCallback(e => {
        onInsert(inputs); 
        //값 초기화
        setInputs({
            name: '',
            content: ''
        })
        e.preventDefault(); //새로고침 막기
    }, [onInsert, inputs]);

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input placeholder="이름을 입력하세요"
                value={name}   
                onChange={onChange}
            />
            <input placeholder="할 일을 추가하세요"
                value={content}
                onChange={onChange}
            />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    )
}
export default TodoInsert;