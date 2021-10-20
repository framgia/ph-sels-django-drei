import {
  FETCH_USER_DETAILS,
  UPDATE_USER_DETAILS,
  FETCH_STUDENT_LIST,
  FETCH_STUDENT_DETAIL,
  FOLLOW_STUDENT,
} from "./types";
import api from "../../api/api";
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

const getStudentList = (limit, offset) => async (dispatch, getState) => {
  const { userData } = getState().auth;
  const response = await api.get("/students/", {
    params: {
      limit: limit,
      offset: offset,
    },
    headers: {
      Authorization: `Bearer ${userData.access}`,
    },
  });
  dispatch({ type: FETCH_STUDENT_LIST, payload: response.data });
};
const getStudentDetail = (id) => async (dispatch, getState) => {
  const { userData } = getState().auth;
  const response = await api.get(`/students/follow/${id}`, {
    headers: {
      Authorization: `Bearer ${userData.access}`,
    },
  });
  dispatch({ type: FETCH_STUDENT_DETAIL, payload: response.data });
};
const followStudent = (id) => async (dispatch, getState) => {
  const { userData } = getState().auth;
  const response = await api.post(`/students/follow/${id}`, null, {
    headers: {
      Authorization: `Bearer ${userData.access}`,
    },
  });
  dispatch({ type: FOLLOW_STUDENT, payload: response.data });
};

export {
  getUserDetails,
  updateUserDetails,
  getStudentList,
  getStudentDetail,
  followStudent,
};
