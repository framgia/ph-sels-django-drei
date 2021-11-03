import React from "react";
import { Field } from "react-final-form";
import { required } from "../../../../utils";
const Choice = ({ name, action, index }) => {
  return (
    <Field name={`${name}.value`} validate={required}>
      {({ input, meta }) => (
        <div className={meta.error && meta.touched ? "field error" : "field"}>
          <label>{index === 0 && "Choices"}</label>
          <div className="ui action input">
            <input {...input} type="text" placeholder="choice" />
            <button type="button" className="ui icon button" onClick={action}>
              <i className="close icon"></i>
            </button>
          </div>
          {meta.error && meta.touched && <p>{meta.error}</p>}
        </div>
      )}
    </Field>
  );
};

export default Choice;
