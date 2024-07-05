import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/dashboard/Layout";

const Routes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world</div>,
    },
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/dashboard", element: <h1>Dashboard</h1> }],
    },
  ]);

  return router;
};

export default Routes;
