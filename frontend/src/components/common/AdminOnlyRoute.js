import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminOnlyRoute = ({ component: Component, path }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      path={path}
      render={(props) =>
        auth?.userData?.is_admin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AdminOnlyRoute;
