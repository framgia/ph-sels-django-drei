import React from "react";
import { Form, Field } from "react-final-form";
import { required } from "../../../utils";

import { useHistory } from "react-router";
import useStore from "../../../store/useStore";

const AdminCategoryAdd = () => {
  const history = useHistory();
  const addCategory = useStore((state) => state.adminAddCategory);

  const renderAdminCategory = () => {
    return (
      <Form
        onSubmit={(formValue) => {
          addCategory(formValue);
          history.push("/admin/categories/");
        }}
      >
        {({ handleSubmit }) => (
          <form className="ui form" onSubmit={handleSubmit}>
            <div className="field">
              <Field name="title" validate={required}>
                {({ input, meta }) => (
                  <div
                    className={
                      meta.error && meta.touched ? "field error" : "field"
                    }
                  >
                    <label>Title</label>
                    <input {...input} type="text" placeholder="title" />
                    {meta.error && meta.touched && (
                      <p>this field is required</p>
                    )}
                  </div>
                )}
              </Field>
              <Field name="description" validate={required}>
                {({ input, meta }) => (
                  <div
                    className={
                      meta.error && meta.touched ? "field error" : "field"
                    }
                  >
                    <label>Description</label>
                    <textarea
                      {...input}
                      type="text"
                      placeholder="description"
                    />
                    {meta.error && meta.touched && (
                      <p>this field is required</p>
                    )}
                  </div>
                )}
              </Field>
            </div>
            <button className="ui button primary" type="submit">
              Save
            </button>
          </form>
        )}
      </Form>
    );
  };
  return <div>{renderAdminCategory()}</div>;
};

export default AdminCategoryAdd;
