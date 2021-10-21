import React, { useEffect, useRef, useCallback, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentList } from "../actions/user";
import "../components/AuthForm.css";
import Loading from "../components/Loading";
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

  const tempStrFunction = (str) =>
    "https://" + str.substring(31, str.length) &&
    "https://semantic-ui.com/images/avatar/large/justen.jpg";

  useEffect(() => {
    dispatch(getStudentList(limit));
  }, [dispatch, limit]);

  const studentList = (student, callback) => {
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
              Stevie Feliciano is a library scientist living in New York City.
              She likes to spend her time reading, running, and writing.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderStudents = () => {
    if (students.results) {
      return students.results.map((student, index) => {
        return students.results.length === index + 1 && students.next
          ? studentList(student, lastStudentCallBack)
          : studentList(student);
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
