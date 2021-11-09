import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Field, Form } from "react-final-form";
import { required } from "../../../utils";
import Loading from "../../../components/common/Loading";
import { sleep } from "../../../utils";
import Modal from "../../../components/common/Modal";
import useStore from "../../../store/useStore";
const AdminCategoryDetail = () => {
  const history = useHistory();
  const getCategory = useStore((state) => state.adminGetCategory);
  const deleteCategory = useStore((state) => state.adminDeleteCategory);
  const updateCategory = useStore((state) => state.adminUpdateCategory);
  const category = useStore((state) => state.category);
  const { id } = useParams();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getCategory(id);
  }, [getCategory, id]);

  const handleDeleteCategory = () => {
    deleteCategory(id);
    alert("Delete successful");
    history.push("/admin/categories");
  };
  const actions = (
    <>
      <button className="ui button negative" onClick={handleDeleteCategory}>
        Delete
      </button>
      <button className="ui button" onClick={() => setModal(false)}>
        Cancel
      </button>
    </>
  );

  const renderAdminCategory = () => {
    if (category) {
      return (
        <Form
          onSubmit={(formValue) => {
            updateCategory(id, formValue);
            alert("Successfully saved!");
            sleep(300);
            history.push("/admin/categories");
          }}
        >
          {({ handleSubmit }) => (
            <form className="ui form" onSubmit={handleSubmit}>
              <div className="field">
                <Field
                  name="title"
                  validate={required}
                  initialValue={category.title}
                >
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
                <Field
                  name="description"
                  validate={required}
                  initialValue={category.description}
                >
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
              <button
                className="ui button red"
                type="button"
                onClick={() => setModal(true)}
              >
                Delete
              </button>
            </form>
          )}
        </Form>
      );
    } else {
      return <Loading />;
    }
  };

  return (
    <div>
      {renderAdminCategory()}
      <Modal
        title="Delete category"
        content="Do you want to delete this category?"
        actions={actions}
        onDismiss={() => history.push(`/admin/categories/${id}`)}
        modal={modal}
      />
    </div>
  );
};

export default AdminCategoryDetail;
