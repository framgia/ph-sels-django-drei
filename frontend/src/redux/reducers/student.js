import {
  FETCH_STUDENT_LIST,
  FETCH_STUDENT_DETAIL,
  FOLLOW_STUDENT,
  UNFOLLOW_STUDENT,
  FETCH_STUDENT_LESSONS,
  FETCH_STUDENT_LESSON,
  FETCH_STUDENT_ACTIVITYLOG,
} from "../actions/types";
import _ from "lodash";

const students = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STUDENT_LIST:
      return { ...state, ...action.payload };
    case FETCH_STUDENT_DETAIL:
      return { ...action.payload };
    case FOLLOW_STUDENT:
      return { ...state, ...action.payload };
    case UNFOLLOW_STUDENT:
      return { ...state, ...action.payload };
    case FETCH_STUDENT_LESSONS:
      return { lessons: action.payload };
    case FETCH_STUDENT_LESSON:
      return { lesson: action.payload };
    case FETCH_STUDENT_ACTIVITYLOG:
      return {
        ...state,
        page: _.omit(action.payload, "results"),
        activityLogs: action.payload.results,
      };
    default:
      return state;
  }
};

export default students;
