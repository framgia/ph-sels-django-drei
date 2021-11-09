import React from "react";
import { Route, Redirect } from "react-router-dom";
import useStore from "../../store/useStore";
const ProtectedCourseRoute = ({ component: Component, path }) => {
  const lesson = useStore((state) => state.lesson);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  return (
    <Route
      path={path}
      render={(props) =>
        lesson && isLoggedIn ? (
          <Redirect to="/categories" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default ProtectedCourseRoute;
