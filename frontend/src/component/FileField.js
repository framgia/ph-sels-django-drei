import React from "react";
import { Field } from "react-final-form";

const FileField = ({ name, ...props }) => {
  return (
    <Field name={name}>
      {({ input: { value, onChange, ...input } }) => (
        <input
          {...input}
          type="file"
          onChange={({ target }) => onChange(target.files)} // instead of the default target.value
          {...props}
        />
      )}
    </Field>
  );
};

export default FileField;
