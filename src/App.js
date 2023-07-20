// import logo from './logo.svg';
import './App.css';
import { useState, useCallback , useEffect, useRef} from 'react';
import TodoTemplate from '../src/components/TodoTemplate';
import TodoList from '../src/components/TodoList';
import TodoInsert from '../src/components/TodoInsert';
import TodoSelect from '../src/components/TodoSelect';


const App = () => {
    
    const [todos, setTodos] = useState([
        {
            id: 1,
            username: '문상훈',
            text: '리액트 TodoList 만들기',
            checked: true,
            category: 'todo List',

        },
        {
            id: 2,
            username: '우영우',
            text: '리액트 스터디 참여하기',
            checked: false,
            category: 'wish List',
        },
        {
            id: 3,
            username: '나선욱',
            text: '눈누난나 퇴근',
            checked: false,
            category: 'todo List',
            
        },
    ])
    const [inputs, setInputs] = useState({
        username: '',
        text: ''
    });
    const { username, text } = inputs; // 비구조화 할당을 통해 값 추출
    const onChange = (e) => {
        const { name, value } = e.target; //e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, //기존 input 객체를 복사
            [name]: value // name 키를 가진 값을 value 로 설정
        });
    };

    // *배열에 새 항목 추가*
    // 배열의 고유값 변수로 사용될 addId
    // useRef() 파라미터로 다음 id 값 넣어줌
    const addId = useRef('4');
    const onInsert = (e) => {
        e.preventDefault(); //새로고침 방지
        const todo = {
            id: addId.current,
            username,
            text,
            checked: false,
            completed: false,
        };
        setTodos(todos.concat(todo));
        // input 비우기
        setInputs({
            username: '',
            text: ''
        });
        addId.current += 1;
    };

    const onRemove = useCallback(
        id => {
        setTodos(todos => 
            todos.filter(todo => todo.id !== id)
        ); //삭제 대상의 id와 일치하지 않는 todo들은 todos 배열에 남기는 배열 재생성
        }, []);

    const onToggle = useCallback(
        id => {
        setTodos(todos =>
            todos.map(todo =>
            todo.id === id ? { ...todo, checked: !todo.checked } : todo,
            //todo.id === id 일때 true라면, 해당 id를 가진 todo의 checked 상태가 반대로 된(토글된) 새로운 배열을 만듦, 아니라면 그대로 이용
            ),
        )
        },[]);

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
    }, [todos]);

    return (
        <TodoTemplate 
            todoLength={todos.length} 
            clearComplete={clearComplete} 
            clearAll={clearAll}>
            <TodoSelect todos={todos}/>
            <TodoInsert 
                onInsert={onInsert}
                onChange={onChange}
                username={username}
                text={text}
            />
            <TodoList 
                todos={todos} 
                onRemove={onRemove} 
                onToggle={onToggle} 
            />
        </TodoTemplate>
    );
};


export default App;
