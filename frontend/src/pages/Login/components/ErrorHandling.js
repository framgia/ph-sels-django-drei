import React from "react";
import Message from "../../../components/common/Message";
import useStore from "../../../store/useStore";
const ErrorHandling = () => {
  const status = useStore((state) => state.status);
  return (
    <>
      {status.errMessage && (
        <Message
          title="error"
          header="Password"
          content={status.errMessage}
          type="negative"
        />
      )}
    </>
  );
};

export default ErrorHandling;
