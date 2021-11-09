import React from "react";
import { Route, Redirect } from "react-router-dom";
import useStore from "../../store/useStore";
const ProtectedRoute = ({ component: Component, path }) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  return (
    <Route
      path={path}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default ProtectedRoute;
