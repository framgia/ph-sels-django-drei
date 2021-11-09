import React, { useEffect } from "react";
import AuthForm from "./components/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signIn } from "../../redux/actions/user";
import "../../index.css";
import Header from "./components/Header";
const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  const onSubmit = (formObj) => {
    dispatch(signIn(formObj));
  };

  useEffect(() => {
    if (auth.isLoggedIn) history.push("/");
  }, [auth, history]);

  return (
    <div className="center-aligned">
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <Header />
          <AuthForm onSubmit={onSubmit} auth={auth} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
