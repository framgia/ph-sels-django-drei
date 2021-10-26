import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Field, Form } from "react-final-form";
import api from "../../api/api";

const SignUpForm = () => {
  const auth = useSelector((state) => state.auth);

  const history = useHistory();
  const required = (value) => (value ? undefined : "this field is required");
  const validatePasswordMatch = (values) => {
    const errors = {};
    if (values.password !== values.password2) {
      errors.password2 = "Password does not match";
    }
    return errors;
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      history.push("/");
    }
  }, [auth.isLoggedIn, history]);

  const signUp = (formValues) => {
    api
      .post("/signup/", formValues)
      .then((res) => {
        history.push("/signin");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(Object.values(err.response.data));
      });
  };
  return (
    <div>
      <Form
        onSubmit={(formObj) => {
          signUp(formObj);
        }}
        validate={validatePasswordMatch}
      >
        {({ handleSubmit }) => (
          <div className="center-aligned">
            <form className="ui form" onSubmit={handleSubmit}>
              <h4 className="ui dividing header">Sign Up</h4>
              <div className="two fields">
                <Field name="first_name" validate={required}>
                  {({ input, meta }) => (
                    <div
                      className={
                        meta.error && meta.touched ? "field error" : "field"
                      }
                    >
                      <label>First Name</label>
                      <input {...input} type="text" placeholder="first name" />
                      {meta.error && meta.touched && <p>{meta.error}</p>}
                    </div>
                  )}
                </Field>
                <Field name="last_name" validate={required}>
                  {({ input, meta }) => (
                    <div
                      className={
                        meta.error && meta.touched ? "field error" : "field"
                      }
                    >
                      <label>Last Name</label>
                      <input {...input} type="text" placeholder="last name" />
                      {meta.error && meta.touched && <p>{meta.error}</p>}
                    </div>
                  )}
                </Field>
              </div>
              <Field name="email" validate={required} type="email">
                {({ input, meta }) => (
                  <div
                    className={
                      meta.error && meta.touched ? "field error" : "field"
                    }
                  >
                    <label>Email</label>
                    <input {...input} type="text" placeholder="email" />
                    {meta.error && meta.touched && <p>{meta.error}</p>}
                  </div>
                )}
              </Field>
              <div className="two fields">
                <Field name="password" validate={required}>
                  {({ input, meta }) => (
                    <div
                      className={
                        meta.error && meta.touched ? "field error" : "field"
                      }
                    >
                      <label>Password</label>
                      <input
                        {...input}
                        type="password"
                        placeholder="password"
                      />
                      {meta.error && meta.touched && <p>{meta.error}</p>}
                    </div>
                  )}
                </Field>
                <Field name="password2" validate={required}>
                  {({ input, meta }) => (
                    <div
                      className={
                        meta.error && meta.touched ? "field error" : "field"
                      }
                    >
                      <label>Confirm Password</label>
                      <input
                        {...input}
                        type="password"
                        placeholder="confirm password"
                      />
                      {meta.error && meta.touched && <p>{meta.error}</p>}
                    </div>
                  )}
                </Field>
              </div>
              <button className="ui button" type="submit">
                Sign up
              </button>
            </form>
          </div>
        )}
      </Form>
    </div>
  );
};

export default SignUpForm;
