import React from "react";
import { Field } from "react-final-form";
import { required } from "../../../utils";
const Choice = ({ choice, QUESTION_KEY, questionId }) => {
  return (
    <React.Fragment>
      <div className="field">
        <div className="ui radio checkbox">
          <Field
            name={`${QUESTION_KEY + questionId}`}
            tabIndex="0"
            component="input"
            type="radio"
            value={"" + choice.id}
            validate={required}
          />{" "}
          <label>{choice.value}</label>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Choice;
