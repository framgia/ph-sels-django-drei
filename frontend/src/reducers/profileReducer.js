import { FETCH_USER_DETAILS, UPDATE_USER_DETAILS } from "../actions/types";

const INITIAL_STATE = {
  profile: {},
};
const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      return { ...state, profile: action.payload };
    case UPDATE_USER_DETAILS:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
