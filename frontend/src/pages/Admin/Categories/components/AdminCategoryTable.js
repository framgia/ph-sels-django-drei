import React from "react";
import { Link } from "react-router-dom";
import AdminCategoryFooter from "./AdminCategoryFooter";
const AdminCategoryTable = ({ categories, page, setPage }) => {
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
                      to={`/admin/categories/${category.id}`}
                      className="ui button primary"
                    >
                      Add Question
                    </Link>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
      </tbody>
      <AdminCategoryFooter page={page} setPage={setPage} />
    </table>
  );
};

export default AdminCategoryTable;
