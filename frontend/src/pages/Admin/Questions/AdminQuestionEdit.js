import React, { useEffect, useState } from "react";
import ChoiceBtn from "./components/ChoiceBtn";
import Choice from "./components/Choice";
import { required, sleep } from "../../../utils";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import Modal from "../../../components/common/Modal";
import useStore from "../../../store/useStore";

const AdminQuestionEdit = () => {
  const { categoryId, questionId } = useParams();
  const history = useHistory();
  const getQuestion = useStore((state) => state.adminFetchQuestion);
  const deleteQuestion = useStore((state) => state.adminDeleteQuestion);
  const updateQuestion = useStore((state) => state.adminUpdateQuestion);
  const selectedQuestion = useStore((state) => state.question);
  const [modal, setModal] = useState(false);

  const handleDeleteQuestion = () => {
    deleteQuestion(categoryId, questionId);
    history.push(`/admin/categories/${categoryId}/questions`);
  };
  const actions = (
    <>
      <button className="ui button negative" onClick={handleDeleteQuestion}>
        Delete
      </button>
      <button className="ui button" onClick={() => setModal(false)}>
        Cancel
      </button>
    </>
  );

  useEffect(() => {
    getQuestion(categoryId, questionId);
  }, [categoryId, questionId, getQuestion]);

  const renderInitialAnswer = () => {
    let answer = "";
    selectedQuestion.choices &&
      selectedQuestion.choices.map((choice, index) => {
        if (choice.is_answer) {
          answer = `values[${index}]`;
        }
        return answer;
      });
    return answer;
  };
  const popValues = (index, values, fields) => {
    values.answer = "";
    return fields.length > 2 && fields.remove(index);
  };

  const parseFormValues = (formValues) => {
    let newObj = {};
    const answer = formValues.answer;
    newObj.description = formValues.question;
    newObj.choices = formValues.values.map((choice, i) => {
      return { ...choice, is_answer: `values[${i}]` === answer };
    });

    return newObj;
  };

  const onSubmit = async (formValues) => {
    const question = parseFormValues(formValues);
    updateQuestion(categoryId, questionId, question);
    await sleep(300);
    alert("Question saved, successfully");
    history.push(`/admin/categories/${categoryId}/questions/`);
  };

  return (
    <div>
      <h4 className="ui header">Update Question</h4>
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
        }}
        initialValues={{
          values: selectedQuestion.choices && selectedQuestion.choices,
          question: selectedQuestion.description,
          answer: renderInitialAnswer(),
        }}
        render={({ handleSubmit, submitting, values }) => {
          return (
            <form className="ui form" onSubmit={handleSubmit}>
              <div className="ui grid">
                <div className="eight wide column">
                  <Field name="question" validate={required}>
                    {({ input, meta }) => (
                      <div
                        className={
                          meta.error && meta.touched ? "field error" : "field"
                        }
                      >
                        <label>Question</label>
                        <input {...input} placeholder="question" type="text" />
                        {meta.error && meta.touched && <p>{meta.error}</p>}
                      </div>
                    )}
                  </Field>
                  <button
                    className="ui submit button green"
                    type="submit"
                    disabled={submitting}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="ui negative basic button"
                    onClick={() => setModal(true)}
                  >
                    Delete
                  </button>
                </div>
                <div className="eight wide column">
                  <FieldArray name="values">
                    {({ fields }) => (
                      <div>
                        {fields.map((name, index) => (
                          <div key={name}>
                            <Choice
                              name={name}
                              index={index}
                              action={() => popValues(index, values, fields)}
                            />
                            <Field
                              name="answer"
                              type="radio"
                              validate={required}
                              value={`values[${index}]`}
                              render={({ input, meta }) => (
                                <div
                                  className={
                                    meta.error && meta.touched
                                      ? "field error"
                                      : "field"
                                  }
                                >
                                  <div className="ui radio checkbox">
                                    <input {...input} />
                                    <label>Answer</label>
                                  </div>
                                </div>
                              )}
                            />
                          </div>
                        ))}
                        <br />
                        <ChoiceBtn
                          title="Add choice"
                          className="ui button primary"
                          action={() =>
                            fields.length < 5 && fields.push({ value: "" })
                          }
                        />
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>
            </form>
          );
        }}
      />
      <Modal
        className="ui negative basic button"
        title="Delete Question"
        content="Delete this question?"
        actions={actions}
        onDismiss={() => {
          setModal(false);
        }}
        modal={modal}
      >
        Delete
      </Modal>
    </div>
  );
};

export default AdminQuestionEdit;
