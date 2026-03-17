import { Outlet, Link, useLoaderData } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const initialTodos = useLoaderData();
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div>
      <nav>
        <Link to="/step/1">Step1</Link> | <Link to="/step/2">Step2</Link>
      </nav>
      <Outlet context={{ todos, setTodos }} />
    </div>
  );
};

export default Layout;