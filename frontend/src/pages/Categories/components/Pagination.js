import React from "react";
import { Link } from "react-router-dom";
const Pagination = ({ categories, page, setPage }) => {
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
  return (
    <div>
      {" "}
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

export default Pagination;
