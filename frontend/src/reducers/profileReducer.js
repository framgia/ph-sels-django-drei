import { FETCH_USER_DETAILS, UPDATE_USER_DETAILS } from "../actions/types";

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      return { ...state, ...action.payload };
    case UPDATE_USER_DETAILS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default profileReducer;
