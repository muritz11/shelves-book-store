import { Flex, Spinner } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../components/dashboard/Layout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import VerifyAccount from "../pages/auth/VerifyAccount";
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
        { path: "/verify", element: <VerifyAccount /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/reset-password", element: <ResetPassword /> },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: <Layout />,
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
          element: <ComingSoon />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return router;
};

// auth
const ForgotPassword = Loadable(
  lazy(() => import("../pages/auth/ForgotPassword"))
);
const ResetPassword = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);

// dashboard
const Dashboard = Loadable(lazy(() => import("../pages/dashboard/Dashboard")));
const Library = Loadable(lazy(() => import("../pages/dashboard/Library")));
const ViewBook = Loadable(lazy(() => import("../pages/dashboard/ViewBook")));
const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));

const ComingSoon = () => {
  return (
    <Flex
      color={"root.textMuted"}
      height={"70vh"}
      justify={"center"}
      align={"center"}
      fontSize={"20px"}
      fontWeight={500}
    >
      Coming soon
    </Flex>
  );
};

export default Routes;
