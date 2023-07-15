// import logo from './logo.svg';
import './App.css';
import { useState, useCallback , useEffect, useRef} from 'react';
import TodoTemplate from '../src/components/TodoTemplate';
import TodoList from '../src/components/TodoList';
import TodoInsert from '../src/components/TodoInsert';
import TodoSelect from '../src/components/TodoSelect';


const App = () => {

    const [todos, setTodos] = useState
        ([
        {
            id: 1,
            text: '리액트 TodoList 만들기',
            checked: true,
            // completed: true
        },
        {
            id: 2,
            text: '리액트 스터디 참여하기',
            checked: false,
            // completed: false
        },
        {
            id: 3,
            text: '눈누난나 퇴근',
            checked: false,
            // completed: false
        },
        ])

    // *배열에 새 항목 추가*
    // 배열의 고유값 변수로 사용될 addId
    // useRef() 파라미터로 다음 id 값 넣어줌
    const addId = useRef('4');

    const onInsert = useCallback(
        text => {
        const todo = {
            id: addId.current,
            text,
            checked: false,
            completed: false
        };
        setTodos(todos => todos.concat(todo)); // concat으로 todos배열에 todo를 추가해서 새로운 배열을 생성
        addId.current += 1; //addId 1씩 더하기
        },
        [],
    );

    const onRemove = useCallback(
        id => {
        setTodos(todos => 
            todos.filter(todo => todo.id !== id)
        ); //삭제 대상의 id와 일치하지 않는 todo들은 todos 배열에 남기는 배열 재생성
        },
        []
    );

    const onToggle = useCallback(
        id => {
        setTodos(todos =>
            todos.map(todo =>
            todo.id === id ? { ...todo, checked: !todo.checked } : todo,
            //todo.id === id 일때 true라면, 해당 id를 가진 todo의 checked 상태가 반대로 된(토글된) 새로운 배열을 만듦, 아니라면 그대로 이용
            ),
        )
        },
        []
    );

    // 완료 항목 일괄 삭제
    const clearComplete = useCallback(() => {
        setTodos(todos => todos.filter(todo => todo.checked !== true)); // checked가 false인 것만 남기는 배열 재생성
        }, []);


    // 전체 항목 삭제
    const clearAll = useCallback(() => {
        setTodos(todos => todos.filter(todo => todo === ''))
    }, []);


    useEffect(() => {
        let num = 0
        for (var i = 0; i < todos.length; i++) {
        if (todos[i].checked === true) {
            num += 1
            if (num === todos.length) {
            alert("할 일 끝!🥳");
            }
        }
        }
    }
    , [todos]);

    return (
        <TodoTemplate todoLength={todos.length} clearComplete={clearComplete} clearAll={clearAll}>
            <TodoSelect />
            <TodoInsert onInsert={onInsert}/>
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
    );
};


export default App;
