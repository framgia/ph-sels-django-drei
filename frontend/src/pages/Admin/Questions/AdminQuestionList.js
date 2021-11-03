import React, { useEffect, useState } from "react";
import { getQuestionList } from "../../../redux/actions/admin";
import { useDispatch, useSelector } from "react-redux";
import AdminQuestionTable from "./components/AdminQuestionTable";
import { useQuery } from "../../../utils";
import { useParams } from "react-router";

const AdminQuestionList = () => {
  const dispatch = useDispatch();
  const questions = useSelector(
    (state) =>
      state.adminQuestions.questions &&
      Object.values(state.adminQuestions.questions)
  );
  const query = useQuery();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(query.get("page") || 1)
  );

  useEffect(() => {
    dispatch(getQuestionList(id, currentPage));
  }, [currentPage, dispatch, id]);
  return (
    <div>
      <AdminQuestionTable
        questions={questions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        categoryId={id}
      />
    </div>
  );
};

export default AdminQuestionList;
