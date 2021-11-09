import React, { useEffect } from "react";

import { useParams, useHistory } from "react-router";
import Wizard from "./components/WizardForm";
import { sleep, trimQuestion } from "../../utils";
import Question from "./components/Question";
import useStore from "../../store/useStore";
const CategoryDetail = () => {
  const fetchCategory = useStore((state) => state.fetchCategory);
  const category = useStore((state) => state.category);
  const fetchStudentLessons = useStore((state) => state.fetchStudentLessons);
  const submitAnswer = useStore((state) => state.submitAnswer);

  const { id } = useParams();
  const history = useHistory();

  const QUESTION_KEY = "question ";

  const onSubmit = async (values) => {
    submitAnswer(id, { category: category.id, answers: trimQuestion(values) });
    await sleep(300);
    alert("Answers have been submitted!");
    history.push("/categories");
  };

  useEffect(() => {
    fetchCategory(id);
    fetchStudentLessons(id);
  }, [fetchCategory, fetchStudentLessons, id, history]);

  const renderCategory = () => {
    if (category.question) {
      return category.question.length ? (
        <Wizard onSubmit={onSubmit}>
          {category.question.map((question, index) => {
            return (
              <Question
                question={question}
                QUESTION_KEY={QUESTION_KEY}
                length={category.question.length}
                index={index}
                key={question.id}
              />
            );
          })}
        </Wizard>
      ) : (
        <>None</>
      );
    } else {
      return <>None</>;
    }
  };
  return (
    <div>
      <div
        className="ui grid center aligned middle aligned"
        style={{ marginTop: "100px" }}
      >
        {renderCategory()}
      </div>
    </div>
  );
};

export default CategoryDetail;
