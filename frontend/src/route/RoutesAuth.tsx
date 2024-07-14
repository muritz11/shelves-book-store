import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }: { children: ReactNode }) {
  let location = useLocation();
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default RequireAuth;