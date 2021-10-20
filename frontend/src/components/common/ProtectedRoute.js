import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ component: Component, path }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      path={path}
      render={(props) =>
        auth.isLoggedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default ProtectedRoute;
