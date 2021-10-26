import React from "react";
import FieldError from "../../../components/common/FieldError";
import Wizard from "./WizardForm";
import Choice from "./Choice";
const Question = ({ question, QUESTION_KEY, length, index }) => {
  return (
    <div className="ui form">
      <Wizard.Page>
        <div className="grouped fields">
          <div className="ui steps">
            <div className="step">
              <div className="title">Questions</div>
              <div className="description">{`${index + 1 + "/" + length}`}</div>
            </div>
          </div>
          <h2 className="ui header">{question.description}</h2>
          <FieldError name={`${QUESTION_KEY + question.id}`} />
          {question.choice.map((choice) => {
            return (
              <Choice
                choice={choice}
                QUESTION_KEY={QUESTION_KEY}
                questionId={question.id}
                key={choice.id}
              />
            );
          })}
        </div>
      </Wizard.Page>
    </div>
  );
};

export default Question;
