import api from "../api";
import { produce } from "immer";
import { mapKeys, omit } from "lodash";
const admin = (set, get) => ({
  pageData: {},
  questions: { pageData: {}, results: {} },
  question: {},
  admins: { pageData: {}, results: {} },
  adminCategories: {},
  adminFetchCategoryList: async (page) => {
    try {
      const response = await api.get("/admin/categories/", {
        params: {
          page: page,
        },
      });
      set(
        produce((state) => {
          state.adminCategories = mapKeys(response.data.results, "id");
          state.pageData = omit(response.data, "results");
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errMessage = err.response.data;
        })
      );
    }
  },
  adminGetCategory: async (id) => {
    try {
      const response = await api.get(`/admin/categories/${id}`);
      set(
        produce((state) => {
          state.category = response.data;
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errMessage = err.response.data;
        })
      );
    }
  },
  adminDeleteCategory: async (id) => {
    try {
      const response = await api.patch(`/admin/categories/${id}`, {
        is_active: false,
      });
      set(
        produce((state) => {
          delete state.adminCategories[response.data.id];
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errMessage = err.response.data;
        })
      );
    }
  },
  adminUpdateCategory: async (id, formValue) => {
    try {
      const response = await api.patch(`/admin/categories/${id}`, formValue);
      set(
        produce((state) => {
          state.adminCategories[response.data.id] = response.data;
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errMessage = err.response.data;
        })
      );
    }
  },
  adminAddCategory: async (formValue) => {
    try {
      const response = await api.post(`/admin/categories/`, formValue);
      set(
        produce((state) => {
          state.adminCategories = { ...response.data };
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errMessage = err.response.data;
        })
      );
    }
  },
  adminFetchQuestionList: async (id, page) => {
    try {
      const response = await api.get(`/admin/categories/${id}/question/`, {
        params: {
          page: page,
        },
      });
      set(
        produce((state) => {
          state.questions.results = mapKeys(response.data.results, "id");
          state.questions.pageData = omit(response.data, "results");
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errMessage = err.response.data;
        })
      );
    }
  },
  adminFetchQuestion: async (categoryId, questionId) => {
    try {
      const response = await api.get(
        `/admin/categories/${categoryId}/question/${questionId}`
      );
      set(
        produce((state) => {
          state.question = response.data;
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errMessage = err.response.data;
        })
      );
    }
  },
  adminQuestionAdd: async (id, formValues) => {
    try {
      const response = await api.post(
        `/admin/categories/${id}/question/`,
        formValues
      );
      set(
        produce((state) => {
          state.questions.results[response.data.id] = response.data;
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errMessage = err.response.data;
        })
      );
    }
  },
  adminUpdateQuestion: async (categoryId, questionId, formValues) => {
    try {
      const response = await api.patch(
        `/admin/categories/${categoryId}/question/${questionId}`,
        formValues
      );
      set(
        produce((state) => {
          state.question = response.data;
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errMessage = err.response.data;
        })
      );
    }
  },
  adminDeleteQuestion: async (categoryId, questionId) => {
    try {
      const response = await api.delete(
        `/admin/categories/${categoryId}/question/${questionId}/delete`
      );
      set(
        produce((state) => {
          delete state.questions.results[response.data.id];
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errMessage = err.response.data;
        })
      );
    }
  },
  adminFetchUsers: async (page) => {
    try {
      const response = await api.get(`/admin/list/`, {
        params: {
          page: page,
        },
      });
      set(
        produce((state) => {
          state.admins.results = response.data.results;
          state.admins.pageData = omit(response.data, "results");
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errMessage = err.response.data;
        })
      );
    }
  },
});

export default admin;
