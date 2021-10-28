import React from "react";
import { Link } from "react-router-dom";
const LessonButton = (props) => {
  return (
    <Link to={props.link} className={props.className}>
      {props.text}
    </Link>
  );
};

export default LessonButton;
