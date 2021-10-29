import {
  ADMIN_CATEGORY_LIST,
  ADMIN_CATEGORY_DETAIL,
  ADMIN_UPDATE_CATEGORY,
  ADMIN_DELETE_CATEGORY,
  ADMIN_ADD_CATEGORY,
} from "./types";

import api from "../../api/api";
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
  const response = await api.get(`/admin/categories/${id}`);
  dispatch({ type: ADMIN_CATEGORY_DETAIL, payload: response.data });
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

export {
  getCategoryList,
  getCategory,
  updateCategory,
  deleteCategory,
  addCategory,
};
