import { Spinner } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../components/dashboard/Layout";
import RoutesAuth from "./RoutesAuth";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ErrorPage from "../pages/ErrorPage";

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner color={"brand.primary"} />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

const Routes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Outlet />
        </>
      ),
      children: [
        { path: "", element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: <RoutesAuth children={<Layout />} />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "library",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <Library />,
            },
            {
              path: "view-book/:bid",
              element: <ViewBook />,
            },
          ],
        },
        {
          path: "authors",
          element: <Authors />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "search",
          element: <Search />,
        },
      ],
    },
  ]);

  return router;
};

// dashboard
const Dashboard = Loadable(lazy(() => import("../pages/dashboard/Dashboard")));
const Library = Loadable(lazy(() => import("../pages/dashboard/Library")));
const ViewBook = Loadable(lazy(() => import("../pages/dashboard/ViewBook")));
const Authors = Loadable(lazy(() => import("../pages/dashboard/Authors")));
const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));

const Search = Loadable(lazy(() => import("../pages/dashboard/Search")));

export default Routes;
