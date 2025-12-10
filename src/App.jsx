import { useState } from "react"

const App = () => {
  const [todos] = useState ([
      { id:1, type:"todo", title:"타이틀 1", desc:"상세1" },
      { id:2, type:"buy", title:"타이틀 2", desc:"상세2" },
      { id:3, type:"sell", title:"타이틀 3", desc:"상세3" },
      { id:4, type:"todo", title:"타이틀 4", desc:"상세4" },
      { id:5, type:"todo", title:"타이틀 5", desc:"상세5" },
   ])

    const categories = ["todo11111", "buy", "sell"];

    const [addCategory, setAddCategory] = useState("todo11111"); //useState("todo11111") 초기값 설정
    const [addTitle, setAddTitle] = useState("");
    const [addDesc, setAddDesc] = useState("");
    
    const [editCategory, setEditCategory] = useState("todo11111");
    const [editTitle, setEditTitle] = useState("");
    const [editDesc, setEditDesc] = useState("");
    

    const handleAdd = () => {
      console.log("신규 입력:", { addCategory, addTitle, addDesc });
    };

    const handleEdit = () => {
      console.log("수정 입력:", { editCategory, editTitle, editDesc });
    };
  return (
    <>
      {/* <div className="input-area">
        <p>todo 신규 입력</p>
        <select>
          <option>todo</option>
          <option>buy</option>
          <option>sell</option>
          <option>todo</option>
          <option>todo</option>
        </select>
        <input type="text" placeholder="타이틀을 입력해주세요"/>
        <input type="text" placeholder="설명을 입력해주세요"/>
        <button type="button">입력</button>
      </div> */}
      <div className="input-area">
        <p>todo 신규 입력</p>

        <select value={addCategory} onChange={(e) => setAddCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="타이틀을 입력해주세요"
          value={addTitle}
          onChange={(e) => setAddTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="설명을 입력해주세요"
          value={addDesc}
          onChange={(e) => setAddDesc(e.target.value)}
        />

        <button type="button" onClick={handleAdd}>입력</button>
      </div>
      
      
      
      <div className="list-area">
        {todos.map(todo => (
          <div className="todo-item" key={todo.id}>
            <input type="checkbox" id={`ck-${todo.id}`} className="todo-checkbox" />
            <label className="todo-type-label" htmlFor={`ck-${todo.id}`}>{todo.type}</label>
            <strong className="todo-title">{todo.title}</strong>
            <span className="todo-desc">{todo.desc}</span>
            <button className="todo-edit-btn">수정</button>
            <button className="todo-delete-btn">삭제</button>
          </div>
        ))}
        
        </div>


      {/* <div className="edit-area">
        <p>수정하기</p>
        <select>
          <option>todo</option>
          <option>buy</option>
          <option>sell</option>
          <option>todo</option>
          <option>todo</option>
        </select>
        <input type="text" placeholder="타이틀을 입력해주세요"/>
        <input type="text" placeholder="설명을 입력해주세요"/>
        <button type="button">입력</button>
      </div> */}
      <div className="edit-area">
        <p>todo 수정 입력</p>

        <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="타이틀을 입력해주세요"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="설명을 입력해주세요"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
        />

        <button type="button" onClick={handleEdit}>입력</button>
      </div>
      
    </>
    
    
    
  )
}

export default App