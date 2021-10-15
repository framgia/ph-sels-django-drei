import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ component: Component }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      render={(props) =>
        auth.isLoggedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default ProtectedRoute;
