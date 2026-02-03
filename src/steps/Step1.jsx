import { useState } from "react"
import TodoTitle from "/src/components/TodoTitle";
import TodoSelect from "/src/components/TodoSelect";
import TodoList from "/src/components/TodoList";

import "/src/App.css";

const Step1 = () => {
  const [todos, setTodos] = useState ([  // todos= 현재 목록  ,  setTodos = 추가되는것
      { id:1, type:"todo", title:"타이틀 1", desc:"상세1" },
      { id:2, type:"buy", title:"타이틀 2", desc:"상세2" },
      { id:3, type:"sell", title:"타이틀 3", desc:"상세3" },
      { id:4, type:"todo", title:"타이틀 4", desc:"상세4" },
      { id:5, type:"todo", title:"타이틀 5", desc:"상세5" },
   ])

    const categories = ["todo", "buy", "sell"];

    const [addCategory, setAddCategory] = useState(""); //useState("todo11111") 초기값 설정    [초기 설정 , 변경되는 값]
    const [checkedTodos, setCheckedTodos] = useState("");
    const [addTitle, setAddTitle] = useState("");
    const [addDesc, setAddDesc] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [prevTitle, setPrevTitle] = useState("");

    const [editCategory, setEditCategory] = useState("");
    const [editId, setEditId] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editDesc, setEditDesc] = useState("");


    const handleAdd = () => {
      if (!addTitle.trim() || !addDesc.trim()){
        console.log('타이틀, 설명 입력 하세요')
        return;
      } // 타이틀 또는 설명 없으면 막기

      const newTodo = {
        id: Date.now(),           // 고유 id
        type: addCategory,
        title: addTitle,
        desc: addDesc,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);

      // 입력창 초기화
      setAddTitle("");
      setAddDesc("");
      setAddCategory(categories[0]);
    };

    const onEdit = (todo, isChecked) =>{
      console.log(isChecked)
      if(!isChecked){
        alert('수정될 체크박스 선택해야됨');
        return;
      }else {
        //todos.id
        setIsEditing(true) //수정입력란 논블럭
        setEditId(todo.id)
        setEditCategory(todo.type)
        setEditTitle(todo.title)
        setEditDesc(todo.desc)

        setPrevTitle(todo.title)
        setCheckedTodos(prev => prev.filter(id => id !== todo.id)); // 최종 체크박스 선택해제 !== 같지 않다 다른거만 남기고 새로 생성
        //console.log("수정 할 데이터", todo.type, todo.title, todo.desc);
      }
      
    }
    
    const onDelete = (todo, isChecked) =>{
      if(!isChecked) {
        console.log(isChecked)
        alert('삭제될 체크박스 선택해야함');
        return;
      }else {
        setTodos(prev => prev.filter(item => item.id !== todo.id))
      }
      console.log(isChecked)
      
    }


    const handleEdit = () => {

      if (!editTitle.trim() || !editDesc.trim()){
        console.log('타이틀, 설명 입력 하세요')
        return;
      } // 타이틀 또는 설명 없으면 막기
      setTodos (prev =>
        prev.map(item =>
          item.id === editId
           ? { ...item, type: editCategory, title: editTitle, desc: editDesc }  //  ...item 기존 item 객체의 모든 속성을 복사
            : item // 수정대상 아니면 그대로 유지
        )
      )
      setIsEditing(false) 
      console.log("수정 입력:", { editCategory, editTitle, editDesc });
    }

  return (
    //<>...</> = Fragment (불필요한 div 안 생김)
    <> 
      <h1>Step1</h1>
      <div className="input-area">
        <TodoTitle text="신규 등록" />
        <TodoSelect 
          categories={categories}
          addCategory={addCategory}
          setAddCategory={setAddCategory}
          addTitle={addTitle}
          setAddTitle={setAddTitle}
          setAddDesc={setAddDesc}
          addDesc={addDesc}
          handleAdd={handleAdd}
          buttonText="추가"
        />
      </div>
      
      
      <TodoList
        todos={todos}
        checkedTodos={checkedTodos}
        setCheckedTodos={setCheckedTodos}
        onEdit={onEdit}
        onDelete={onDelete}
      />




      {isEditing &&(
        <div className="edit-area">
          <TodoTitle 
            text={`${prevTitle}수정 입력`}
          />
          <TodoSelect 
            categories={categories}
            editCategory={editCategory}
            setEditCategory={setEditCategory}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editDesc={editDesc}
            setEditDesc={setEditDesc}
            handleEdit={handleEdit}
            buttonText="확인"
          />
        </div>
      )}
      
      
    </>
    
    
    
  )
}

export default Step1