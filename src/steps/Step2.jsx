import { useOutletContext, useNavigate } from "react-router-dom";

const Step2 = () => {
  const { todos } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Step2</h1>

      {todos.map((todo) => (
        <div key={todo.id}>
          <strong>{todo.title}</strong> / {todo.type} / {todo.desc}
        </div>
      ))}

      <button onClick={() => navigate("/step/1")}>이전</button>
    </div>
  );
};

export default Step2;