import {
  FETCH_CATEGORY_LIST,
  FETCH_CATEGORY,
  SUBMIT_ANSWER,
} from "../actions/types";

import api from "../../api/api";

const getCategories = (page) => async (dispatch) => {
  const response = await api.get(`/students/categories/?page=${page}`);
  dispatch({ type: FETCH_CATEGORY_LIST, payload: response.data });
};
const getCategory = (id) => async (dispatch) => {
  const response = await api.get(`/students/categories/${id}`);
  dispatch({ type: FETCH_CATEGORY, payload: response.data });
};

const submitAnswer = (id, formValues) => async (dispatch) => {
  api
    .post(`/students/answers/${id}`, formValues)
    .then((response) => {
      dispatch({ type: SUBMIT_ANSWER, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: SUBMIT_ANSWER, payload: error.response.data });
    });
};

export { getCategories, getCategory, submitAnswer };
