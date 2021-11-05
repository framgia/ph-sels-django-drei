import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentList } from "../../redux/actions/student";
import "../../index.css";
import Loading from "../../components/common/Loading";
import Student from "./components/Student";
import SearchStudent from "./components/SearchStudent";

const StudentListPage = () => {
  const students = useSelector((state) => state.students);
  const observer = useRef("");
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const [debounceSearch, setDebounceSearch] = useState(searchText);

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
    dispatch(getStudentList(limit, 0, debounceSearch));
  }, [dispatch, limit, debounceSearch]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceSearch(() => searchText);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchText]);

  const renderStudents = () => {
    if (students.results) {
      return students.results.map((student, index) => {
        return students.results.length === index + 1 && students.next ? (
          <Student
            student={student}
            callback={lastStudentCallBack}
            key={student.id}
          />
        ) : (
          <Student student={student} key={student.id} />
        );
      });
    } else {
      return <Loading />;
    }
  };

  return (
    <div className="ui grid">
      <div className="row">
        <div className="column">
          <SearchStudent
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>
      </div>
      <div className="row">
        <div className="ui five column grid link doubling cards">
          {renderStudents()}
        </div>
      </div>
    </div>
  );
};

export default StudentListPage;
