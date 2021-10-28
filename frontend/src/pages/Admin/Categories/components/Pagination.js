import React from "react";
import { Link } from "react-router-dom";
import { usePagination, DOTS } from "../../../../hooks/usePagination";
import { useSelector } from "react-redux";
const Pagination = (props) => {
  const pageData = useSelector((state) => state.adminCategories.page);
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const pageLink = () => {
    return "/admin/categories";
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="ui right floated pagination menu">
      <Link
        to={{
          pathname: pageLink(),
          search: `page=${pageData.previous ? currentPage - 1 : currentPage}`,
        }}
        className={{ disabled: currentPage === 1 }}
        onClick={onPrevious}
      >
        <i className="left chevron icon"></i>
      </Link>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230</li>;
        }
        return (
          <li
            className={
              pageNumber === currentPage ? "icon item active" : "icon item"
            }
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/* Right Navigation arrow */}
      <Link className={{ disabled: currentPage === lastPage }} onClick={onNext}>
        <div className="arrow right" />
      </Link>
    </div>
  );
};
export default Pagination;
