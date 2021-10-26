import React, { useEffect, useRef, useCallback, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getStudentList } from "../../redux/actions/student";
import "../../index.css";
import Loading from "../../components/common/Loading";
import StudentList from "./components/StudentList";

const StudentListPage = () => {
  const students = useSelector((state) => state.students);
  const observer = useRef("");
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();

  //Logic to observe dom for the last item
  const lastStudentCallBack = useCallback((node) => {
    observer.current && observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLimit((limit) => limit + 5);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    dispatch(getStudentList(limit));
  }, [dispatch, limit]);

  const renderStudents = () => {
    if (students.results) {
      return students.results.map((student, index) => {
        return students.results.length === index + 1 && students.next ? (
          <StudentList
            student={student}
            callback={lastStudentCallBack}
            key={student.id}
          />
        ) : (
          <StudentList student={student} key={student.id} />
        );
      });
    } else {
      return <Loading />;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="ui items">{renderStudents()}</div>
    </div>
  );
};

export default StudentListPage;
