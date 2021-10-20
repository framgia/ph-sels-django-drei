import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_USER_DETAILS,
  UPDATE_USER_DETAILS,
} from "./types";
import api from "../../api/api";
const signIn = (formValues) => async (dispatch) => {
  const response = await api.post("/auth/token/", formValues);
  dispatch({ type: SIGN_IN, payload: response.data });
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

  const response = await api.get(`/profile/${id ? id : userData.user_id}/`, {
    headers: {
      Authorization: `Bearer ${userData.access}`,
    },
  });
  dispatch({ type: FETCH_USER_DETAILS, payload: response.data });
};

const updateUserDetails = (formValues) => async (dispatch, getState) => {
  const { userData } = getState().auth;
  const response = await api.patch(
    `/profile/${userData.user_id}/`,
    formValues,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.access}`,
      },
    }
  );
  dispatch({ type: UPDATE_USER_DETAILS, payload: response.data });
};
export { signIn, signOut, getUserDetails, updateUserDetails };
