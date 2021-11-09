import React, { useEffect, useState } from "react";
import AdminCategoryTable from "./components/AdminCategoryTable";

import useStore from "../../../store/useStore";
const AdminCategoryList = () => {
  const fetchCategories = useStore((state) => state.adminFetchCategoryList);
  const categories = useStore((state) => state.adminCategories);

  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCategories(page);
  }, [fetchCategories, page]);

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
