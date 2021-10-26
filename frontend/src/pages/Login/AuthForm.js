import React, { useEffect } from "react";
import { Field, Form } from "react-final-form";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { signIn } from "../../redux/actions/user";

const AuthForm = () => {
  const required = (value) => (value ? undefined : "Required");
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.isLoggedIn) history.push("/");
  }, [auth, history]);
  return (
    <Form
      onSubmit={(formObj) => {
        dispatch(signIn(formObj));
      }}
    >
      {({ handleSubmit }) => (
        <div className="center-aligned">
          <form className="ui form" onSubmit={handleSubmit}>
            <h4 className="ui dividing header">E-Learning System</h4>
            <Field name="email" validate={required}>
              {({ input, meta }) => (
                <div
                  className={
                    meta.error && meta.touched ? "field error" : "field"
                  }
                >
                  <label>Email</label>
                  <input {...input} type="text" placeholder="email" />
                  {meta.error && meta.touched && <p>this field is required</p>}
                </div>
              )}
            </Field>
            <Field name="password" validate={required}>
              {({ input, meta }) => (
                <div
                  className={
                    meta.error && meta.touched ? "field error" : "field"
                  }
                >
                  <label>Password</label>
                  <input {...input} type="password" placeholder="password" />
                  {meta.error && meta.touched && <p>this field is required</p>}
                </div>
              )}
            </Field>
            <button className="ui button" type="submit">
              Login
            </button>
            <Link to="/signup">
              <p>Don't have an account? Signup</p>
            </Link>
          </form>
        </div>
      )}
    </Form>
  );
};

export default AuthForm;
