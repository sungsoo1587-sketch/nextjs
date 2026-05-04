import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Step1 /> },
      { path: "step/1", element: <Step1 /> },
      { path: "step/2", element: <Step2 /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}