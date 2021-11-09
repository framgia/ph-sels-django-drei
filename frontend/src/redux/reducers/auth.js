import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from "../actions/types";
import { getFromLocalStorage } from "../../utils";

const INITIAL_STATE = {
  isLoggedIn: getFromLocalStorage().isLoggedIn,
  userData: getFromLocalStorage().userData,
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return { ...action.payload };
    case SIGN_IN_SUCCESS:
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ isLoggedIn: true, userData: action.payload })
      );
      return { isLoggedIn: true, userData: action.payload };
    case SIGN_IN_FAIL:
      return { ...action.payload };
    case SIGN_UP_REQUEST:
      return { ...action.payload };
    case SIGN_UP_SUCCESS:
      return { ...action.payload };
    case SIGN_UP_FAIL:
      return { errors: action.payload };
    case SIGN_OUT:
      localStorage.removeItem("userInfo");
      return { ...state, isLoggedIn: false, userData: null };
    default:
      return state;
  }
};

export default auth;
