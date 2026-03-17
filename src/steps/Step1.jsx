import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import TodoTitle from "../components/TodoTitle";
import TodoSelect from "../components/TodoSelect";
import TodoList from "../components/TodoList";
import "../App.css";

const Step1 = () => {
  const { todos, setTodos } = useOutletContext();
  const navigate = useNavigate();

  const categories = ["todo", "buy", "sell"];

  const [addCategory, setAddCategory] = useState(categories[0]);
  const [checkedTodos, setCheckedTodos] = useState([]);
  const [addTitle, setAddTitle] = useState("");
  const [addDesc, setAddDesc] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [prevTitle, setPrevTitle] = useState("");

  const [editCategory, setEditCategory] = useState("");
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const handleAdd = () => {
    if (!addTitle.trim() || !addDesc.trim()) return;

    const newTodo = {
      id: Date.now(),
      type: addCategory,
      title: addTitle,
      desc: addDesc,
    };

    setTodos((prev) => [...prev, newTodo]);
    setAddTitle("");
    setAddDesc("");
    setAddCategory(categories[0]);
  };

  const onEdit = (todo) => {


    setIsEditing(true);
    setEditId(todo.id);
    setEditCategory(todo.type);
    setEditTitle(todo.title);
    setEditDesc(todo.desc);
    setPrevTitle(todo.title);
    setCheckedTodos((prev) => prev.filter((id) => id !== todo.id));
  };

  const onDelete = (todo, isChecked) => {
    if (!isChecked) {
      alert("삭제할 항목을 체크하세요.");
      return;
    }

    setTodos((prev) => prev.filter((item) => item.id !== todo.id));
  };

  const handleEdit = () => {
    if (!editTitle.trim() || !editDesc.trim()) return;

    setTodos((prev) =>
      prev.map((item) =>
        item.id === editId
          ? { ...item, type: editCategory, title: editTitle, desc: editDesc }
          : item
      )
    );

    setIsEditing(false);
    console.log(editTitle);
    console.log(editDesc);
  };

  return (
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
          addDesc={addDesc}
          setAddDesc={setAddDesc}
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

      {isEditing && (
        <div className="edit-area">
          <TodoTitle text={`${prevTitle} 수정 입력`} />
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

      <button onClick={() => navigate("/step/2")}>다음 단계</button>
    </>
  );
};

export default Step1;