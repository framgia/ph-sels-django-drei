import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminList } from "../../../redux/actions/admin";
import AdminListPagination from "./components/AdminListPagination";
import { useQuery } from "../../../utils";
import { timeSince } from "../../../utils";
const AdminList = () => {
  const dispatch = useDispatch();
  const { admins } = useSelector((state) => state.adminUserList);
  const query = useQuery();
  const [page, setPage] = useState(parseInt(query.get("page")) || 1);

  useEffect(() => {
    dispatch(fetchAdminList(page));
  }, [dispatch, page]);

  return (
    <div>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {admins &&
            admins.map((admin) => (
              <React.Fragment key={admin.id}>
                <tr>
                  <td data-label="Email">{admin.email}</td>
                  <td data-label="FirstName">{admin.first_name}</td>
                  <td data-label="LastName">{admin.last_name}</td>
                  <td data-label="LastLogin">{timeSince(admin.last_login)}</td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
        <AdminListPagination page={page} setPage={setPage} />
      </table>
    </div>
  );
};

export default AdminList;
