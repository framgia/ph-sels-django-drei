import React from "react";
import Message from "../../../components/common/Message";

const ErrorHandling = ({ auth }) => {
  return (
    <>
      {auth?.errors?.password && (
        <Message
          title="error"
          header="Password"
          content={auth.errors.password}
          type="negative"
        />
      )}
      {auth?.errors?.error && (
        <Message
          title="error"
          header="Error"
          content={auth?.errors?.error}
          type="negative"
        />
      )}
      {auth?.errors?.email && (
        <Message
          title="error"
          content={auth.errors.email}
          type="negative"
          header="Email"
        />
      )}
    </>
  );
};

export default ErrorHandling;
