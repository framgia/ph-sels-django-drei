import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { useSelector } from "react-redux";
import Pagination from "./components/Pagination";
import { getStudentLessons } from "../../redux/actions/student";
import { getCategories } from "../../redux/actions/category";
import { useDispatch } from "react-redux";
import Lesson from "../../components/common/Lesson";
import LessonButton from "../../components/common/LessonButton";
const CategoryList = () => {
  const lessons = useSelector((state) => state.students.lessons);
  const categories = useSelector((state) => state.categories);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories(page));
    dispatch(getStudentLessons());
  }, [dispatch, page]);

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
      <Navbar />
      <h4 className="ui header">Categories</h4>
      <div className="ui grid">
        <div className="ui three column row"> {renderCategoryList()}</div>
      </div>

      <Pagination categories={categories} page={page} setPage={setPage} />
    </div>
  );
};

export default CategoryList;
