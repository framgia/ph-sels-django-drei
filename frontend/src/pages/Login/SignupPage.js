import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signUp } from "../../redux/actions/user";
import SignUpForm from "./components/SignUpForm";
import Header from "./components/Header";
const SignupPage = () => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isLoggedIn) history.push("/");
  }, [auth, history]);

  const onSubmit = (formValues) => {
    console.log("test");
    dispatch(signUp(formValues));
  };

  return (
    <div className="center-aligned">
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <Header />
          <SignUpForm onSubmit={onSubmit} auth={auth} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
