import { useState } from "react";
import { useTodoStore } from "../store/todoStore1";
import TodoTitle from "../components/TodoTitle";
import TodoSelect from "../components/TodoSelect";
import TodoList from "../components/TodoList";
import "../App.css";


const Step1 = () => {
  const { todos, addTodo, deleteTodo, editTodo } = useTodoStore();

  const categories = ["todo", "buy", "sell"];
  const [checkedTodos, setCheckedTodos] = useState([]);
 

  //추가 
  const [addForm, setAddForm] = useState({
    category: categories[0],
    title: "",
    desc: "",
  });
  const handleAdd = () => {
    if (!addForm.title.trim() || !addForm.desc.trim()) {
      alert('타이틀 및 설명 입력')
      return;
    }

    const newTodo = {
      id: Date.now(),
      type: addForm.category,
      title: addForm.title,
      desc: addForm.desc,
    };

    //setTodos((prev) => [...prev, newTodo]);
    addTodo(newTodo);
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

  const handleEdit = () => {
    if (!editForm.title.trim() || !editForm.desc.trim()) return;

    editTodo(editForm.id, {
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
  const onDelete = (todo) => {
    deleteTodo(todo.id);
  };
  return (
    <>
      <h1>Step1</h1>
      <p>zustand persist 사용 ../store/todoStore1</p>
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
          <div className="dim"></div>
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

export default Step1;