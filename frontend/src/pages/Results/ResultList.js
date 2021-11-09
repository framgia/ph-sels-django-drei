import React, { useEffect } from "react";
import Loading from "../../components/common/Loading";
import Lesson from "../../components/common/Lesson";
import LessonButton from "../../components/common/LessonButton";
import useStore from "../../store/useStore";
const ResultList = () => {
  const lessons = useStore((state) => state.lessons);
  const fetchStudentLessons = useStore((state) => state.fetchStudentLessons);

  useEffect(() => {
    fetchStudentLessons();
  }, [fetchStudentLessons]);

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
