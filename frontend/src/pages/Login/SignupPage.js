import React, { useEffect } from "react";
import SignUpForm from "./components/SignUpForm";
import Header from "./components/Header";
import useStore from "../../store/useStore";
import { useHistory } from "react-router";
const SignupPage = () => {
  const signUp = useStore((state) => state.signUp);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) history.push("/");
  }, [isLoggedIn, history]);

  const onSubmit = (formValues) => {
    signUp(formValues);
  };

  return (
    <div className="center-aligned">
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <Header />
          <SignUpForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
