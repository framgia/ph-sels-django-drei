import {
  FETCH_USER_DETAILS,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  UPDATED_USER_DETAILS,
} from "../actions/types";

const INITIAL_STATE = {};
const profile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      return { ...state, ...action.payload };
    case UPDATE_USER_DETAILS_REQUEST:
      return { request: "updating..." };
    case UPDATE_USER_DETAILS_SUCCESS:
      return { ...action.payload, success: "Profile saved successfully" };
    case UPDATED_USER_DETAILS:
      return { ...action.payload };
    case UPDATE_USER_DETAILS_FAIL:
      return { ...action.payload };
    default:
      return state;
  }
};

export default profile;
