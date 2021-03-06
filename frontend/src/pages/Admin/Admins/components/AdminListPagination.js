import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "../../../../store/useStore";
const AdminListPagination = ({ page, setPage }) => {
  const pageData = useStore((state) => state.admins.pageData);
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
    return "/admin";
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
        </th>
      </tr>
    </tfoot>
  );
};

export default AdminListPagination;
