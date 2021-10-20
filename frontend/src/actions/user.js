import { FETCH_USER_DETAILS, UPDATE_USER_DETAILS } from "../actions/types";

import api from "../api/api";
const getUserDetails = () => async (dispatch, getState) => {
  const { userData } = getState().auth;
  const response = await api.get(`/profile/${userData.user_id}/`, {
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

export { getUserDetails, updateUserDetails };
