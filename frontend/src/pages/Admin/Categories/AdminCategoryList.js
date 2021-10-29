import React, { useEffect, useState } from "react";
import AdminCategoryTable from "./components/AdminCategoryTable";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryList } from "../../../redux/actions/admin";
import { useQuery } from "../../../utils";

const AdminCategoryList = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.adminCategories);
  const query = useQuery();
  const [page, setPage] = useState(parseInt(query.get("page")) || 1);

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
