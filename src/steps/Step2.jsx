import { useEffect, useState } from "react";
import { useTodoStore } from "../store/todoStore2";
import TodoTitle from "../components/TodoTitle";
import TodoSelect from "../components/TodoSelect";
import TodoList from "../components/TodoList";
import "../App.css";

const Step2 = () => {
  const {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    deleteTodo,
    editTodo,
  } = useTodoStore();

  const categories = ["todo", "buy", "sell"];
  const [checkedTodos, setCheckedTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  // 추가
  const [addForm, setAddForm] = useState({
    category: categories[0],
    title: "",
    desc: "",
  });

  const handleAdd = async () => {
    if (!addForm.title.trim() || !addForm.desc.trim()) {
      alert("타이틀 및 설명 입력");
      return;
    }

    const newTodo = {
      type: addForm.category,
      title: addForm.title,
      desc: addForm.desc,
    };

    await addTodo(newTodo);

    setAddForm({
      category: categories[0],
      title: "",
      desc: "",
    });
  };

  // 수정
  const [editForm, setEditForm] = useState({
    isEditing: false,
    prevTitle: "",
    id: null,
    category: "",
    title: "",
    desc: "",
  });

  const onEdit = (todo) => {
    setEditForm({
      isEditing: true,
      prevTitle: todo.title,
      id: todo.id,
      category: todo.type,
      title: todo.title,
      desc: todo.desc,
    });

    setCheckedTodos((prev) => prev.filter((id) => id !== todo.id));
  };

  const handleEdit = async () => {
    if (!editForm.title.trim() || !editForm.desc.trim()) {
      alert("타이틀 및 설명 입력");
      return;
    }

    await editTodo(editForm.id, {
      type: editForm.category,
      title: editForm.title,
      desc: editForm.desc,
    });

    setEditForm({
      isEditing: false,
      prevTitle: "",
      id: null,
      category: "",
      title: "",
      desc: "",
    });
  };

  // 삭제
  const onDelete = async (todo) => {
    await deleteTodo(todo.id);
  };

  const closeEdit = () => {
    setEditForm({
      isEditing: false,
      prevTitle: "",
      id: null,
      category: "",
      title: "",
      desc: "",
    });
  };

  if (loading) {
    return <p>데이터 불러오는 중...</p>;
  }

  if (error) {
    return <p>에러 발생: {error}</p>;
  }

  return (
    <>
      <h1>Step2</h1>
      <p>json-server 사용 ../store/todoStore2</p>
      <p>json-server 명렁어 : npx json-server --watch public/db2.json --port 3001</p>
      <p>4/8</p>

      <div className="input-area">
        <TodoTitle text="신규 등록" />
        <TodoSelect
          categories={categories}
          addCategory={addForm.category}
          setAddCategory={(value) =>
            setAddForm((prev) => ({ ...prev, category: value }))
          }
          addTitle={addForm.title}
          setAddTitle={(value) =>
            setAddForm((prev) => ({ ...prev, title: value }))
          }
          addDesc={addForm.desc}
          setAddDesc={(value) =>
            setAddForm((prev) => ({ ...prev, desc: value }))
          }
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

      {editForm.isEditing && (
        <>
          <div className="dim" onClick={closeEdit}></div>
          <div className="edit-area">
            <TodoTitle text={`${editForm.prevTitle} 수정 입력`} />
            <TodoSelect
              categories={categories}
              editCategory={editForm.category}
              setEditCategory={(value) =>
                setEditForm((prev) => ({ ...prev, category: value }))
              }
              editTitle={editForm.title}
              setEditTitle={(value) =>
                setEditForm((prev) => ({ ...prev, title: value }))
              }
              editDesc={editForm.desc}
              setEditDesc={(value) =>
                setEditForm((prev) => ({ ...prev, desc: value }))
              }
              handleEdit={handleEdit}
              buttonText="확인"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Step2;