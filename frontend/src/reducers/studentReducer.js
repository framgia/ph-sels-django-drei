import {
  FETCH_STUDENT_LIST,
  FETCH_STUDENT_DETAIL,
  FOLLOW_STUDENT,
  UNFOLLOW_STUDENT,
} from "../actions/types";

const studentReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STUDENT_LIST:
      return { ...state, ...action.payload };
    case FETCH_STUDENT_DETAIL:
      return { ...action.payload };
    case FOLLOW_STUDENT:
      return { ...action.payload };
    case UNFOLLOW_STUDENT:
      return { ...action.payload };

    default:
      return state;
  }
};

export default studentReducer;
