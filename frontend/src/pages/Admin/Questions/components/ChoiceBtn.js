import React from "react";

const ChoiceBtn = ({ title, className, action }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <button type="button" className={className} onClick={action}>
        {title}
      </button>
    </div>
  );
};

export default ChoiceBtn;
