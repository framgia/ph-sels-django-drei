import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedCourseRoute = ({ component: Component, path }) => {
  const lesson = useSelector((state) => state.students.lesson);
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      path={path}
      render={(props) =>
        lesson && auth ? (
          <Redirect to="/categories" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default ProtectedCourseRoute;
