import React from "react";
import { Route, Redirect } from "react-router-dom";
import useStore from "../../store/useStore";
const AdminOnlyRoute = ({ component: Component, path }) => {
  const userData = useStore((state) => state.userData);
  return (
    <Route
      path={path}
      render={(props) =>
        userData?.is_admin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AdminOnlyRoute;
