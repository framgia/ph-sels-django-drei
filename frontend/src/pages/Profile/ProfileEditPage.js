import React, { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserDetails } from "../../redux/actions/user";
import FileField from "../../components/FileField";
import { required } from "../../utils";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const validatePasswordMatch = (values) => {
    const errors = {};
    if (values.password !== values.password2) {
      errors.password2 = "Password does not match";
    }
    return errors;
  };
  const handleSubmit = async (formObj, event) => {
    const formData = new FormData();
    if (formObj.hasOwnProperty("avatar")) {
      formData.append("avatar", formObj.avatar[0]);
    }
    if (formObj.hasOwnProperty("password")) {
      formData.append("password", formObj.password);
    }
    for (var key in formObj) {
      formData.append(key, formObj[key]);
    }
    dispatch(updateUserDetails(formData));
    event.reset();
  };
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <div>
      <Form onSubmit={handleSubmit} validate={validatePasswordMatch}>
        {({ handleSubmit }) => (
          <div>
            <form className="ui form" onSubmit={handleSubmit}>
              <img
                className="ui circular small image"
                src={
                  profile.avatar ||
                  "https://www.wddonline.com/content/uploads/2020/08/placeholder-image.png"
                }
                alt=""
              />
              <FileField name="avatar" />
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
                    {meta.error && meta.touched && (
                      <p>this field is required</p>
                    )}
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
                    {meta.error && meta.touched && (
                      <p>this field is required</p>
                    )}
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
                    {meta.error && meta.touched && (
                      <p>this field is required</p>
                    )}
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
                      <input
                        {...input}
                        type="password"
                        placeholder="password"
                      />
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
              <button className="ui button" type="submit">
                Save changes
              </button>
            </form>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ProfilePage;
