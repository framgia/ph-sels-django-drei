import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT,
  FETCH_USER_DETAILS,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
} from "./types";
import api from "../../api/api";

const signIn = (formValues) => async (dispatch) => {
  dispatch({
    type: SIGN_IN_REQUEST,
    payload: { request: "Signing in..." },
  });

  api
    .post("/auth/token/", formValues)
    .then((response) => {
      setTimeout(() => {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: response.data,
        });
      }, 500);
    })
    .catch((error) => {
      setTimeout(
        () => dispatch({ type: SIGN_IN_FAIL, payload: error.response.data }),
        300
      );
    });
};

const signUp = (formValues) => async (dispatch) => {
  dispatch({
    type: SIGN_UP_REQUEST,
    payload: { request: "" },
  });
  api
    .post("/signup/", formValues)
    .then((response) => {
      setTimeout(() => {
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: response.data,
        });
      }, 500);
    })
    .catch((error) => {
      setTimeout(
        () => dispatch({ type: SIGN_UP_FAIL, payload: error.response.data }),
        300
      );
    });
};

const signOut = () => async (dispatch, getState) => {
  const { userData } = getState().auth;
  await api.post(
    "/auth/logout/",
    { refresh: userData.refresh },
    {
      headers: {
        Authorization: `Bearer ${userData.access}`,
      },
    }
  );
  dispatch({ type: SIGN_OUT });
};
const getUserDetails = (id) => async (dispatch, getState) => {
  const { userData } = getState().auth;

  const response = await api.get(`/profile/${id ? id : userData.user_id}/`);
  dispatch({ type: FETCH_USER_DETAILS, payload: response.data });
};

const updateUserDetails = (formValues) => async (dispatch, getState) => {
  const { userData } = getState().auth;
  dispatch({ type: UPDATE_USER_DETAILS_REQUEST });
  api
    .patch(`/profile/${userData.user_id}/`, formValues)
    .then((response) => {
      setTimeout(() => {
        dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: response.data });
      }, 1000);
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_USER_DETAILS_FAIL,
        payload: error.response.data,
      });
    });
};

export { signIn, signUp, signOut, getUserDetails, updateUserDetails };
