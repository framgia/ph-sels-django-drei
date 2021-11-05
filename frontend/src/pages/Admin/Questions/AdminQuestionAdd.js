import React from "react";
import ChoiceBtn from "./components/ChoiceBtn";
import Choice from "./components/Choice";
import { required, sleep } from "../../../utils";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { useParams } from "react-router-dom";
import { addQuestion } from "../../../redux/actions/admin";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const AdminQuestionAdd = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const parseFormValues = (formValues) => {
    let newObj = {};
    const choices = formValues.values;
    const answer = formValues.answer;

    newObj.description = formValues.question;
    choices.map((choice, i) => {
      return { ...choice, is_answer: `values[${i}]` === answer };
    });
    newObj.choices = choices;

    return newObj;
  };
  const popValues = (index, values, fields) => {
    values.answer = "";
    return fields.length > 2 && fields.remove(index);
  };

  const onSubmit = async (formValues) => {
    const question = parseFormValues(formValues);

    dispatch(addQuestion(id, question));
    await sleep(300);
    alert("Question saved, successfully");
    history.push("/admin/categories");
  };

  return (
    <div>
      <h4 className="ui header">Add Question</h4>
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
        }}
        initialValues={{
          values: [{ value: "" }, { value: "" }],
          question: "",
          answer: "",
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
    </div>
  );
};

export default AdminQuestionAdd;
