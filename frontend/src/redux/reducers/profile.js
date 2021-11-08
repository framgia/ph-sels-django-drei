import { FETCH_USER_DETAILS, UPDATE_USER_DETAILS } from "../actions/types";

const INITIAL_STATE = {};
const profile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      return { ...state, ...action.payload };
    case UPDATE_USER_DETAILS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default profile;
