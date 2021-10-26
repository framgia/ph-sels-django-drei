import React, { useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { getCategory, submitAnswer } from "../../redux/actions/category";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Wizard from "./components/WizardForm";
import { sleep, trimQuestion } from "../../utils";
import Loading from "../../components/common/Loading";
import Question from "./components/Question";

const CategoryDetail = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.selectedCategory);
  const { id } = useParams();

  const QUESTION_KEY = "question ";

  const onSubmit = async (values) => {
    dispatch(
      submitAnswer(id, { category: category.id, answers: trimQuestion(values) })
    );
    await sleep(300);
  };

  useEffect(() => {
    dispatch(getCategory(id));
  }, [dispatch, id]);

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
      return <Loading />;
    }
  };
  return (
    <div>
      <Navbar />
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
