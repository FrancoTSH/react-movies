import { useAuth } from "hooks/auth";
import { Navigate, Outlet, Route, RouteProps, useLocation } from "react-router-dom";

export const Authenticated = (props: RouteProps) => {
  const { authenticatedUser } = useAuth();
  const currentLocation = useLocation();

  if (!authenticatedUser) {
    return <Navigate to="/login" state={{ from: currentLocation }} />;
  }

  return (
    <Route {...props}>
      <Outlet />
    </Route>
  );
};

export const NonAuthenticated = (props: RouteProps) => {
  const { currentUser } = { currentUser: "e" };

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Route {...props}>
      <Outlet />
    </Route>
  );
};
