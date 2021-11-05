import React from "react";
import { Field, Form } from "react-final-form";
import { required } from "../../../utils";
import { Link } from "react-router-dom";
import { validatePasswordMatch } from "../../../utils";
import ErrorHandling from "./ErrorHandling";
const SignUpForm = ({ onSubmit, auth }) => {
  return (
    <Form
      onSubmit={(formObj) => {
        onSubmit(formObj);
      }}
      validate={validatePasswordMatch}
    >
      {({ handleSubmit }) => (
        <form className="ui large form" onSubmit={handleSubmit}>
          <div className="ui segment">
            <h3 className="ui header red ">Sign Up</h3>
            <div className="two fields">
              <Field name="first_name" validate={required}>
                {({ input, meta }) => (
                  <div
                    className={
                      meta.error && meta.touched ? "field error" : "field"
                    }
                  >
                    <div className="ui left icon input">
                      <i class="user icon"></i>
                      <input {...input} type="text" placeholder="First Name" />
                    </div>
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
                    <div className="ui left icon input">
                      <i class="user icon"></i>
                      <input {...input} type="text" placeholder="Last Name" />
                    </div>
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
                  <div className="ui left icon input">
                    <i class="envelope icon"></i>
                    <input {...input} placeholder="Email" />
                  </div>
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
                    <div className="ui left icon input">
                      <i class="lock icon"></i>
                      <input
                        {...input}
                        type="password"
                        placeholder="Password"
                      />
                    </div>
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
                    <div className="ui left icon input">
                      <i class="lock icon"></i>
                      <input
                        {...input}
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                )}
              </Field>
            </div>
            <ErrorHandling auth={auth} />
            <div style={{ textAlign: "left" }}>
              <button className="ui large red button" type="submit">
                Sign up
              </button>
              <Link to="/signin" className="ui large button" type="submit">
                Login
              </Link>
            </div>
          </div>
        </form>
      )}
    </Form>
  );
};

export default SignUpForm;
