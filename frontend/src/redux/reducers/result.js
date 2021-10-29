import { FETCH_STUDENT_LESSON_RESULT } from "../actions/types";

const results = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STUDENT_LESSON_RESULT:
      return { ...action.payload };
    default:
      return state;
  }
};

export default results;
