import { tempStrFunction } from "../../../utils";
import { useHistory } from "react-router";
const Student = ({ student, callback }) => {
  const history = useHistory();
  const navigateToStudent = () => {
    history.push(`/students/profile/${student.id}`);
  };
  return (
    <div className="column">
      <div
        ref={callback}
        className="ui fluid red card"
        onClick={navigateToStudent}
      >
        <div className="image">
          <img src={tempStrFunction(student.avatar)} alt="" />
        </div>
        <div className="content">
          <div className="header">
            {student.first_name + " " + student.last_name}
          </div>
        </div>
        <div className="extra content">
          <span>Lessons: {student.total_lesson_learned}</span>
          <br />
          <span className="left floated">
            Followers: {student.total_followers}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Student;
