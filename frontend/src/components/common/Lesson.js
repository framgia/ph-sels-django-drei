import React from "react";

const Lesson = (props) => {
  return (
    <div
      className="column"
      style={{ paddingBottom: "20px" }}
      key={props.category.id}
    >
      <div className="ui card">
        <div className="content">
          <div className="header">{props.category.title}</div>
          <div className="meta">2 days ago</div>
          <div className="description">
            <p>{props.category.description}</p>
          </div>
          {props.children ? props.children : ""}
        </div>
      </div>
    </div>
  );
};

export default Lesson;
