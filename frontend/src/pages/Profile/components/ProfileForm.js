import React from "react";
import { Field, Form } from "react-final-form";

import { required } from "../../../utils";
import FileField from "../../../components/FileField";
import "../../../index.css";
import Loading from "../../../components/common/Loading";
import Message from "../../../components/common/Message";

const ProfileForm = ({ onSubmit, profile, status }) => {
  const validatePasswordMatch = (values) => {
    const errors = {};
    if (values.password !== values.password2) {
      errors.password2 = "Password does not match";
    }

    if (values.password && !values.oldPassword) {
      errors.oldPassword = "this field is required";
    }

    return errors;
  };
  return (
    <Form onSubmit={onSubmit} validate={validatePasswordMatch}>
      {({ handleSubmit }) => (
        <form className="ui large form" onSubmit={handleSubmit}>
          <div className="ui segment">
            <div className="button-image-container">
              <img
                className="ui small rounded image"
                src={
                  profile.avatar
                    ? profile.avatar
                    : "https://www.wddonline.com/content/uploads/2020/08/placeholder-image.png"
                }
                alt=""
              />
              <div className="overlay">
                <label htmlFor="upload">
                  <FileField name="avatar" />
                  <i className="ui circular icon pencil white" />
                </label>
              </div>
            </div>
            <br />
            <Field
              name="first_name"
              validate={required}
              initialValue={profile.first_name}
            >
              {({ input, meta }) => (
                <div
                  className={
                    meta.error && meta.touched ? "field error" : "field"
                  }
                >
                  <label>First Name</label>
                  <input {...input} type="text" placeholder="first name" />
                  {meta.error && meta.touched && <p>this field is required</p>}
                </div>
              )}
            </Field>
            <Field
              name="last_name"
              validate={required}
              initialValue={profile.last_name}
            >
              {({ input, meta }) => (
                <div
                  className={
                    meta.error && meta.touched ? "field error" : "field"
                  }
                >
                  <label>Last Name</label>
                  <input {...input} type="text" placeholder="last name" />
                  {meta.error && meta.touched && <p>this field is required</p>}
                </div>
              )}
            </Field>
            <Field
              name="email"
              validate={required}
              initialValue={profile.email}
            >
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

            <Field name="oldPassword">
              {({ input, meta }) => (
                <div
                  className={
                    meta.error && meta.touched ? "field error" : "field"
                  }
                >
                  <label>Old Password</label>
                  <input
                    {...input}
                    type="password"
                    placeholder="Old Password"
                  />
                  {meta.error && meta.touched && <p>{meta.error}</p>}
                </div>
              )}
            </Field>

            <div className="two fields">
              <Field name="password">
                {({ input, meta }) => (
                  <div
                    className={
                      meta.error && meta.touched ? "field error" : "field"
                    }
                  >
                    <label>Password</label>
                    <input {...input} type="password" placeholder="password" />
                    {meta.error && meta.touched && <p>{meta.error}</p>}
                  </div>
                )}
              </Field>
              <Field name="password2">
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
            {status.loading && <Loading />}
            {status.successMessage ? (
              <Message
                header="Success"
                content="Profile Saved Successfully"
                type="positive"
              />
            ) : (
              status.errMessage && (
                <Message
                  header="Error"
                  content={status.errMessage}
                  type="negative"
                />
              )
            )}
            <button className="ui red button" type="submit">
              Save changes
            </button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default ProfileForm;
