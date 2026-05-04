import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTodoStore } from "./store/todoStore1"; //step1.jsx 용

const Layout = () => {
  const { fetchTodos } = useTodoStore();

  useEffect(() => {//step1.jsx 용
    fetchTodos();
  }, [fetchTodos]);
  return (
    <div>
      <nav>
        <Link to="/step/1">Step1</Link> | 
        <Link to="/step/2">Step2</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;