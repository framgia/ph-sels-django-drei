import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/Loading";
import { getStudentLessons } from "../../redux/actions/student";
import Lesson from "../../components/common/Lesson";
import LessonButton from "../../components/common/LessonButton";
const ResultList = () => {
  const dispatch = useDispatch();
  const lessons = useSelector((state) => state.students.lessons);
  useEffect(() => {
    dispatch(getStudentLessons());
  }, [dispatch]);

  const renderStudentLessons = () => {
    return lessons ? (
      lessons.map((lesson) => {
        return (
          <Lesson category={lesson.category} key={lesson.id}>
            <LessonButton
              text="View results"
              link={`/results/${lesson.category.id}`}
              className="ui button primary"
            />
          </Lesson>
        );
      })
    ) : (
      <Loading />
    );
  };
  return (
    <div>
      <h4 className="ui header">Results</h4>
      <div className="ui grid">
        <div className="ui three column row"> {renderStudentLessons()}</div>
      </div>
    </div>
  );
};

export default ResultList;
