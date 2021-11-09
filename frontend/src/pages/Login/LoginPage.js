import React, { useEffect } from "react";
import AuthForm from "./components/AuthForm";
import { useHistory } from "react-router";
import "../../index.css";
import Header from "./components/Header";
import useStore from "../../store/useStore";
const LoginPage = () => {
  const history = useHistory();
  const signIn = useStore((state) => state.signIn);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const status = useStore((state) => state.status);

  const onSubmit = (formObj) => {
    signIn(formObj);
  };

  useEffect(() => {
    if (isLoggedIn) history.push("/");
  }, [history, isLoggedIn]);

  return (
    <div className="center-aligned">
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <Header />
          <AuthForm onSubmit={onSubmit} status={status} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
