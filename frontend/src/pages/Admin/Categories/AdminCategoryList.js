import React, { useEffect, useState } from "react";
import AdminCategoryTable from "./components/AdminCategoryTable";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryList } from "../../../redux/actions/admin";

const AdminCategoryList = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.adminCategories);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCategoryList(page));
  }, [dispatch, page]);

  return (
    <div>
      <AdminCategoryTable
        categories={Object.values(categories)}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default AdminCategoryList;
