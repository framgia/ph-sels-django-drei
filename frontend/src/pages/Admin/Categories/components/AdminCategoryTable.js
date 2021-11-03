import React from "react";
import { Link } from "react-router-dom";
import TablePagination from "../../../../components/common/TablePagination";
import { useSelector } from "react-redux";
const AdminCategoryTable = ({ categories, page, setPage }) => {
  const pageData = useSelector((state) => state.adminCategories.page);
  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories &&
          categories.map((category) => {
            return (
              <React.Fragment key={category.id}>
                <tr>
                  <td data-label="Title">
                    <Link to={`/admin/categories/${category.id}`}>
                      {category.title}
                    </Link>
                  </td>
                  <td data-label="Description">{category.description}</td>
                  <td data-label="Action">
                    <Link
                      to={`/admin/categories/${category.id}/question/add`}
                      className="ui small basic primary button"
                    >
                      Add Question
                    </Link>
                    <Link
                      to={`/admin/categories/${category.id}/questions`}
                      className="ui small basic button"
                    >
                      View Questions
                    </Link>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
      </tbody>
      <TablePagination page={page} setPage={setPage} pageData={pageData}>
        <Link className="ui small primary button" to={`/admin/categories/add`}>
          Add Category
        </Link>
      </TablePagination>
    </table>
  );
};

export default AdminCategoryTable;
