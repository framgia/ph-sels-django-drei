import React from "react";
import { Field } from "react-final-form";

const FileField = ({ name, ...props }) => {
  return (
    <Field name={name} type="file">
      {({ input: { value, onChange, ...input } }) => (
        <input
          style={{ display: "none" }}
          id="upload"
          {...input}
          onChange={({ target }) => onChange(target.files)} // instead of the default target.value
          {...props}
        />
      )}
    </Field>
  );
};

export default FileField;
