import React from "react";
import AdminList from "./Admins/AdminList";
import AdminCategoryList from "./Categories/AdminCategoryList";
const AdminPage = () => {
  return (
    <div>
      <h4 className="ui header">Admin List</h4>
      <AdminList />
      <h4 className="ui header">Category List</h4>
      <AdminCategoryList />
    </div>
  );
};

export default AdminPage;
