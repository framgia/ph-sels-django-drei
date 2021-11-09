import React, { useEffect, useState } from "react";
import AdminQuestionTable from "./components/AdminQuestionTable";
import { useQuery } from "../../../utils";
import { useParams } from "react-router";
import useStore from "../../../store/useStore";

const AdminQuestionList = () => {
  const questions = useStore((state) => Object.values(state.questions.results));
  const getQuestions = useStore((state) => state.adminFetchQuestionList);
  const query = useQuery();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(query.get("page") || 1)
  );

  useEffect(() => {
    getQuestions(id, currentPage);
  }, [currentPage, getQuestions, id]);
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
