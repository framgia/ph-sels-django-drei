import React from "react";
import { Link } from "react-router-dom";
import TablePagination from "../../../../components/common/TablePagination";
import { useSelector } from "react-redux";
const AdminQuestionTable = ({
  questions,
  currentPage,
  setCurrentPage,
  categoryId,
}) => {
  const pageData = useSelector((state) => state.adminQuestions.page);
  const pageLink = `/admin/categories/${categoryId}/questions`;

  return (
    <div>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {questions &&
            questions.map((question) => {
              return (
                <React.Fragment key={question.id}>
                  <tr>
                    <td data-label="Description">{question.description}</td>
                    <td data-label="Action">
                      <Link
                        className="ui blue basic button"
                        to={`/admin/categories/${categoryId}/question/edit/${question.id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
        </tbody>
        <TablePagination
          page={currentPage}
          setPage={setCurrentPage}
          pageData={pageData}
          pageLink={pageLink}
        >
          <Link className="ui small primary button" to={`/admin/categories/`}>
            Go back
          </Link>
        </TablePagination>
      </table>
    </div>
  );
};

export default AdminQuestionTable;
