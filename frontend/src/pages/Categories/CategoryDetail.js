import React, { useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { getCategory, submitAnswer } from "../../redux/actions/category";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import Wizard from "./components/WizardForm";
import { sleep, trimQuestion } from "../../utils";
import Question from "./components/Question";
import { getStudentLesson } from "../../redux/actions/student";
import Loading from "../../components/common/Loading";
const CategoryDetail = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories);
  const lesson = useSelector((state) => state.students.lesson);
  const { id } = useParams();
  const history = useHistory();

  const QUESTION_KEY = "question ";

  const onSubmit = async (values) => {
    dispatch(
      submitAnswer(id, { category: category.id, answers: trimQuestion(values) })
    );
    await sleep(300);
    alert("Answers have been submitted!");
    history.push("/categories");
  };

  useEffect(() => {
    dispatch(getCategory(id));
    dispatch(getStudentLesson(id));
  }, [dispatch, id, history, lesson]);

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
