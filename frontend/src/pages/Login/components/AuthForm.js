import React from "react";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
import Message from "../../../components/common/Message";
import Loader from "./Loader";
import { required } from "../../../utils";

const AuthForm = ({ onSubmit, auth }) => {
  return (
    <Form
      onSubmit={(formObj) => {
        onSubmit(formObj);
      }}
    >
      {({ handleSubmit }) => (
        <>
          <form className="ui large form" onSubmit={handleSubmit}>
            <div className="ui segment">
              <Field name="email" validate={required}>
                {({ input, meta }) => (
                  <div
                    className={
                      meta.error && meta.touched ? "field error" : "field"
                    }
                  >
                    <div className="ui left icon input">
                      <i class="user icon"></i>
                      <input {...input} type="text" placeholder="Email" />
                    </div>
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
                    {" "}
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
              <button
                className="ui fluid large red submit button"
                type="submit"
              >
                Login
              </button>

              {auth.request && <Loader />}
              {auth.error && (
                <Message header="Error" content={auth.error} type="negative" />
              )}
            </div>
          </form>
          <div className="ui message">
            <p>
              Don't have an account? <Link to="/signup">Signup </Link>
            </p>
          </div>
        </>
      )}
    </Form>
  );
};

export default AuthForm;
