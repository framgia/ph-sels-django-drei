import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { getCategories } from "../../actions";
import { Link } from "react-router-dom";
const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
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
  }, [page, dispatch]);

  const renderCategories = () => {
    if (categories.results) {
      return categories.results.map((category) => {
        return (
          <div className="column" style={{ paddingBottom: "20px" }}>
            <div className="ui card">
              <div className="content">
                <div className="header">{category.title}</div>
                <div className="meta">2 days ago</div>
                <div className="description">
                  <p>{category.description}</p>
                </div>
              </div>
              <Link to={`/categories/${category.id}`} class="ui primary button">
                Start
              </Link>
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
          <i class="left arrow icon"></i>
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
          <i class="right arrow icon"></i>
          Next
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CategoryList;
