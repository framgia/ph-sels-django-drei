import {
  FETCH_CATEGORY_LIST,
  FETCH_CATEGORY,
  SUBMIT_ANSWER,
} from "../actions/types";

import api from "../../api/api";
const getCategories = (page) => async (dispatch, getState) => {
  const { userData } = getState().auth;
  const response = await api.get(`/students/categories/?page=${page}`, {
    headers: {
      Authorization: `Bearer ${userData.access}`,
    },
  });

  dispatch({ type: FETCH_CATEGORY_LIST, payload: response.data });
};
const getCategory = (id) => async (dispatch, getState) => {
  const { userData } = getState().auth;
  const response = await api.get(`/students/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${userData.access}`,
    },
  });
  dispatch({ type: FETCH_CATEGORY, payload: response.data });
};

const submitAnswer = (id, formValues) => async (dispatch, getState) => {
  const { userData } = getState().auth;
  api
    .post(`/students/answers/${id}`, formValues, {
      headers: {
        Authorization: `Bearer ${userData.access}`,
      },
    })
    .then((response) => {
      dispatch({ type: SUBMIT_ANSWER, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: SUBMIT_ANSWER, payload: error.response.data });
    });
};

export { getCategories, getCategory, submitAnswer };
