import React from "react";

const Message = ({ header, content, type }) => {
  const renderContent = (content) => {
    return Array.isArray(content) ? (
      content.map((c) => (
        <ul className="ui list">
          <li>{c}</li>
        </ul>
      ))
    ) : (
      <p>{content}</p>
    );
  };

  return (
    <div className={`ui ${type} message`} style={{ textAlign: "left" }}>
      <div className="header">{header}</div>
      {renderContent(content)}
    </div>
  );
};

export default Message;
