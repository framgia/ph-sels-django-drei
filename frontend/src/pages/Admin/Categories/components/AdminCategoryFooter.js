import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminCategoryFooter = ({ page, setPage }) => {
  const pageData = useSelector((state) => state.adminCategories.page);
  const [pages, setPages] = useState([]);

  const nextPage = () => {
    if (pageData.next) {
      setPage(page + 1);
    }
    return;
  };
  const prevPage = () => {
    if (pageData.previous) {
      setPage(page - 1);
    }
    return;
  };

  const pageLink = () => {
    return "/admin/categories";
  };

  const pageNumbers = useCallback(() => {
    const pageNum = [];
    let total_pages = pageData.total_pages;

    for (let i = 1; i < total_pages + 1; i++) {
      pageNum.push(
        <Link
          to={{
            pathname: pageLink(),
            search: `page=${i}`,
          }}
          className={i === page ? "item active" : "item"}
          key={i}
          onClick={() => setPage(i)}
        >
          {i}
        </Link>
      );
    }
    return pageNum;
  }, [pageData, setPage, page]);

  useEffect(() => {
    setPages(pageNumbers());
  }, [pageData, pageNumbers]);

  return (
    <tfoot>
      <tr>
        <th colSpan="5">
          <div className="ui right floated pagination menu">
            <Link
              to={{
                pathname: pageLink(),
                search: `page=${pageData.previous ? page - 1 : page}`,
              }}
              className="icon item"
              onClick={prevPage}
            >
              <i className="left chevron icon"></i>
            </Link>
            {pageData?.total_pages ? pages : null}
            <Link
              to={{
                pathname: pageLink(),
                search: `page=${pageData.next ? page + 1 : page}`,
              }}
              className="icon item"
              onClick={nextPage}
            >
              <i className="right chevron icon"></i>
            </Link>
          </div>
          <Link
            className="ui small primary button"
            to={`/admin/categories/add`}
          >
            Add Category
          </Link>
        </th>
      </tr>
    </tfoot>
  );
};

export default AdminCategoryFooter;
