import { produce } from "immer";
import api from "../api";

const category = (set, get) => ({
  categories: {},
  category: {},
  fetchCategoryList: async (page) => {
    try {
      const response = await api.get(`/students/categories/?page=${page}`);
      set(
        produce((state) => {
          state.categories = response.data;
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
  fetchCategory: async (id) => {
    try {
      const response = await api.get(`/students/categories/${id}`);
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
  submitAnswer: async (id, formValues) => {
    try {
      api.post(`/students/answers/${id}`, formValues);
    } catch (err) {
      set(
        produce((state) => {
          state.statu.errMessage = err.response.data;
        })
      );
    }
  },
});

export default category;
