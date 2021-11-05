import {
  ADMIN_CATEGORY_LIST,
  ADMIN_CATEGORY_DETAIL,
  ADMIN_UPDATE_CATEGORY,
  ADMIN_DELETE_CATEGORY,
  ADMIN_ADD_CATEGORY,
  ADMIN_ADD_QUESTION,
  ADMIN_QUESTION_LIST,
  ADMIN_QUESTION_RETRIEVE,
  ADMIN_QUESTION_UPDATE,
  ADMIN_QUESTION_DELETE,
  ADMIN_USER_LIST,
} from "./types";

import api from "../../api/api";
import history from "../../history";

const getCategoryList = (page) => async (dispatch) => {
  const response = await api.get("/admin/categories/", {
    params: {
      page: page,
    },
  });
  dispatch({ type: ADMIN_CATEGORY_LIST, payload: response.data });
};

const addCategory = (formValue) => async (dispatch) => {
  const response = await api.post(`/admin/categories/`, formValue);
  dispatch({ type: ADMIN_ADD_CATEGORY, payload: response.data });
};

const getCategory = (id) => async (dispatch) => {
  api
    .get(`/admin/categories/${id}`)
    .then((response) => {
      dispatch({ type: ADMIN_CATEGORY_DETAIL, payload: response.data });
    })
    .catch(() => {
      history.push("/admin/categories");
    });
};

const updateCategory = (id, formValue) => async (dispatch) => {
  const response = await api.patch(`/admin/categories/${id}`, formValue);
  dispatch({ type: ADMIN_UPDATE_CATEGORY, payload: response.data });
};

const deleteCategory = (id) => async (dispatch) => {
  const response = await api.patch(`/admin/categories/${id}`, {
    is_active: false,
  });
  dispatch({ type: ADMIN_DELETE_CATEGORY, payload: response.data });
};

const getQuestionList = (id, page) => async (dispatch) => {
  const response = await api.get(`/admin/categories/${id}/question/`, {
    params: {
      page: page,
    },
  });
  dispatch({ type: ADMIN_QUESTION_LIST, payload: response.data });
};

const addQuestion = (id, formValues) => async (dispatch) => {
  const response = await api.post(
    `/admin/categories/${id}/question/`,
    formValues
  );
  dispatch({ type: ADMIN_ADD_QUESTION, payload: response.data });
};
const getQuestion = (categoryId, questionId) => async (dispatch) => {
  api
    .get(`/admin/categories/${categoryId}/question/${questionId}`)
    .then((response) => {
      dispatch({ type: ADMIN_QUESTION_RETRIEVE, payload: response.data });
    })
    .catch(() => {
      history.push(`/admin/categories/${categoryId}/questions`);
    });
};
const updateQuestion =
  (categoryId, questionId, formValues) => async (dispatch) => {
    const response = await api.patch(
      `/admin/categories/${categoryId}/question/${questionId}`,
      formValues
    );
    dispatch({ type: ADMIN_QUESTION_UPDATE, payload: response.data });
  };
const deleteQuestion = (categoryId, questionId) => async (dispatch) => {
  const response = await api.delete(
    `/admin/categories/${categoryId}/question/${questionId}/delete`
  );
  dispatch({ type: ADMIN_QUESTION_DELETE, payload: response.data });
};

const fetchAdminList = (page) => async (dispatch) => {
  const response = await api.get(`/admin/list/`, {
    params: {
      page: page,
    },
  });
  dispatch({ type: ADMIN_USER_LIST, payload: response.data });
};
export {
  getCategoryList,
  getCategory,
  updateCategory,
  deleteCategory,
  addCategory,
  getQuestionList,
  addQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  fetchAdminList,
};
