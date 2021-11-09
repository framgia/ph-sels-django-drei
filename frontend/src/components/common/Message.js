import React from "react";

const Message = ({ header, content, type }) => {
  const renderArray = (c) => {
    return Array.isArray(c) ? c.map((i) => <li key={i}>{i}</li>) : <li>{c}</li>;
  };

  const renderContent = () => {
    return typeof content === "object" ? (
      Object.values(content).map((c, i) => (
        <ul className="ui list" key={i}>
          {renderArray(c)}
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
