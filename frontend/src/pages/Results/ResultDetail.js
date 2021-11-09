import React, { useEffect } from "react";
import { useParams } from "react-router";
import useStore from "../../store/useStore";
const ResultDetail = () => {
  const { id } = useParams();
  const results = useStore((state) => state.results);
  const fetchLessonResults = useStore((state) => state.fetchLessonResults);

  useEffect(() => {
    fetchLessonResults(id);
  }, [fetchLessonResults, id]);

  const renderResultTable = () => {
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => {
            return (
              <tr
                key={result.id}
                className={result.is_correct_answer ? "positive" : "error"}
              >
                <td>
                  <i
                    className={
                      result.is_correct_answer
                        ? "large green checkmark icon"
                        : "large red close icon"
                    }
                  ></i>
                </td>
                <td>{result.question}</td>
                <td>{result.answer}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const resultCount = () => {
    return results.filter((result) => result.is_correct_answer).length;
  };

  return (
    <div className="ui container">
      <h4 className=" ui header">{results[0] && results[0].category}</h4>
      <h4 className=" ui header">
        Results: {resultCount()} of {results.length}{" "}
      </h4>
      {renderResultTable()}
    </div>
  );
};

export default ResultDetail;
