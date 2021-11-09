import React from "react";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
import Message from "../../../components/common/Message";
import Loader from "./Loader";
import { required } from "../../../utils";
import useStore from "../../../store/useStore";
import { debounce } from "lodash";
const AuthForm = ({ onSubmit, status }) => {
  const setLoading = useStore((state) => state.setLoading);

  return (
    <Form
      onSubmit={(formObj) => {
        setLoading(true);
        debounce(() => onSubmit(formObj), 100)();
      }}
    >
      {({ handleSubmit }) => (
        <>
          <form className="ui large form" onSubmit={handleSubmit}>
            <div className="ui segment">
              <Field name="email" validate={required} type="email">
                {({ input, meta }) => (
                  <div
                    className={
                      meta.error && meta.touched ? "field error" : "field"
                    }
                  >
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input {...input} placeholder="Email" />
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
                      <i className="lock icon"></i>
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
              {status.loading && <Loader />}
              {status.errorMessage && (
                <Message
                  header="Error"
                  content={status.errorMessage.error}
                  type="negative"
                />
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
