import { SIGN_IN, SIGN_OUT } from "../actions/types";

const getFromLocalStorage = () => {
  if (localStorage.getItem("userInfo")) {
    return JSON.parse(localStorage.getItem("userInfo"));
  } else {
    return false;
  }
};

const INITIAL_STATE = {
  isLoggedIn: getFromLocalStorage().isLoggedIn,
  userData: getFromLocalStorage().userData,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...state, isLoggedIn: true, userData: action.payload })
      );
      return { ...state, isLoggedIn: true, userData: action.payload };
    case SIGN_OUT:
      localStorage.removeItem("userInfo");
      return { ...state, isLoggedIn: false, userData: null };
    default:
      return state;
  }
};

export default authReducer;
