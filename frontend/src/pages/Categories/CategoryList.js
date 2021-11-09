import React, { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import Lesson from "../../components/common/Lesson";
import LessonButton from "../../components/common/LessonButton";
import useStore from "../../store/useStore";
const CategoryList = () => {
  const lessons = useStore((state) => state.lessons);
  const fetchStudentLessons = useStore((state) => state.fetchStudentLessons);
  const fetchCategoryList = useStore((state) => state.fetchCategoryList);
  const categories = useStore((state) => state.categories);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCategoryList(page);
    fetchStudentLessons();
  }, [fetchCategoryList, fetchStudentLessons, page]);

  const renderLessonButton = (category) => {
    const x = lessons.some((lesson) => lesson.category.id === category.id);
    return x ? (
      <LessonButton
        text="Course already taken"
        className="ui button disabled"
        link="/"
      />
    ) : (
      <LessonButton
        text="Start"
        link={`/categories/${category.id}`}
        className="ui button primary"
      />
    );
  };
  const renderCategoryList = () => {
    if (categories.results && lessons) {
      return categories.results.map((category, index) => {
        return (
          <Lesson category={category} key={category.id}>
            {renderLessonButton(category)}
          </Lesson>
        );
      });
    }
  };

  return (
    <div>
      <h4 className="ui header">Categories</h4>
      <div className="ui grid">
        <div className="ui three column row"> {renderCategoryList()}</div>
      </div>

      <Pagination categories={categories} page={page} setPage={setPage} />
    </div>
  );
};

export default CategoryList;
