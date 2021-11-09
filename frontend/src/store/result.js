import { produce } from "immer";
import api from "../api";
const result = (set, get) => ({
  lessons: null,
  results: [],
  fetchStudentLessons: async () => {
    try {
      const response = await api.get(`/students/lessons/`);
      set(
        produce((state) => {
          state.lessons = response.data;
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
  fetchLessonResults: async (id) => {
    try {
      const response = await api.get(`/students/lessons/results/${id}`);
      set(
        produce((state) => {
          state.results = response.data;
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

export default result;
