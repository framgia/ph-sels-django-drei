import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/common/Loading";
import { getCategories } from "../../redux/actions/category";
import { Link } from "react-router-dom";
import { getStudentLessons } from "../../redux/actions/student";
const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const student_lesson = useSelector((state) => state.students.lessons);
  const [page, setPage] = useState(1);

  const prevPage = () => {
    if (categories.previous) {
      setPage((page) => page - 1);
    }
    return;
  };
  const nextPage = () => {
    if (categories.next) {
      setPage((page) => page + 1);
    }
    return;
  };
  useEffect(() => {
    dispatch(getCategories(page));
    dispatch(getStudentLessons());
  }, [dispatch, page]);

  const renderLessonButton = (category) => {
    const x = student_lesson.some((lesson) => lesson.category === category.id);
    return x ? (
      <button className="ui button disabled" key={category.id}>
        Course already Taken
      </button>
    ) : (
      <Link
        to={`/categories/${category.id}`}
        className="ui primary button"
        key={category.id}
      >
        Start
      </Link>
    );
  };

  const renderCategories = () => {
    if (categories.results && student_lesson) {
      return categories.results.map((category, index) => {
        return (
          <div
            className="column"
            style={{ paddingBottom: "20px" }}
            key={category.id}
          >
            <div className="ui card">
              <div className="content">
                <div className="header">{category.title}</div>
                <div className="meta">2 days ago</div>
                <div className="description">
                  <p>{category.description}</p>
                </div>
                {renderLessonButton(category)}
              </div>
            </div>
          </div>
        );
      });
    } else {
      <Loading />;
    }
  };
  return (
    <div>
      <Navbar />
      <h4 className="ui header">Categories</h4>
      <div className="ui grid">
        <div className="ui three column row">{renderCategories()}</div>
      </div>
      {categories.previous ? (
        <Link
          to={`categories?page=${page - 1}`}
          className="ui left labeled icon button"
          onClick={prevPage}
        >
          <i className="left arrow icon"></i>
          Previous
        </Link>
      ) : (
        <></>
      )}

      {categories.next ? (
        <Link
          to={`categories?page=${page + 1}`}
          className="ui right labeled icon button"
          onClick={nextPage}
        >
          <i className="right arrow icon"></i>
          Next
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CategoryList;
