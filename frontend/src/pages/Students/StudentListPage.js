import React, { useEffect, useRef, useCallback, useState } from "react";
import "../../index.css";
import Loading from "../../components/common/Loading";
import Student from "./components/Student";
import SearchStudent from "./components/SearchStudent";
import useStore from "../../store/useStore";
import Message from "../../components/common/Message";

const StudentListPage = () => {
  const students = useStore((state) => state.students);
  const fetchStudentList = useStore((state) => state.fetchStudentList);
  const status = useStore((state) => state.status);

  const observer = useRef("");
  const [limit, setLimit] = useState(10);
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
    fetchStudentList(limit, 0, debounceSearch);
  }, [limit, debounceSearch, fetchStudentList]);

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
      if (status.errMessage) {
        return (
          <Message header="Error" type="negative" content={status.errMessage} />
        );
      }
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
          {students.count < 1 && <p>No results found</p>}
        </div>
      </div>
    </div>
  );
};

export default StudentListPage;
