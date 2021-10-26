import { tempStrFunction } from "../../../utils";
import { Link } from "react-router-dom";

const StudentList = ({ student, callback }) => {
  return (
    <div ref={callback} className="item" key={student.id}>
      <img
        className="ui tiny image"
        src={tempStrFunction(student.avatar)}
        alt=""
      />
      <div className="content">
        <Link to={`/students/profile/${student.id}`} className="header">
          {student.first_name + " " + student.last_name}
        </Link>
        <div className="description">
          <p>
            Stevie Feliciano is a library scientist living in New York City. She
            likes to spend her time reading, running, and writing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
