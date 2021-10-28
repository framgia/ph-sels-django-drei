import { FETCH_STUDENT_LESSON_RESULT } from "../actions/types";

import api from "../../api/api";

const getLessonResult = (id) => async (dispatch) => {
  const response = await api.get(`/students/lessons/results/${id}`);
  dispatch({ type: FETCH_STUDENT_LESSON_RESULT, payload: response.data });
};

export { getLessonResult };
