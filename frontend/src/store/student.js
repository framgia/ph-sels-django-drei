import { produce } from "immer";
import api from "../api";
import { omit } from "lodash";
const student = (set, get) => ({
  students: {},
  student: {},
  activityLogs: [],
  page: {},
  fetchStudentList: async (limit, offset, student) => {
    try {
      const response = await api.get("/students/", {
        params: {
          limit: limit,
          offset: offset,
          search: student,
        },
      });
      set(
        produce((state) => {
          state.students = response.data;
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
  fetchStudentDetail: async (id) => {
    try {
      const response = await api.get(`/students/follow/${id}`);
      set(
        produce((state) => {
          state.student = response.data;
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
  fetchStudentActivityLog: async (id) => {
    try {
      const response = await api.get(`students/${id}/logs`);
      set(
        produce((state) => {
          state.page = omit(response.data, "results");
          state.activityLogs = response.data.results;
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
  followStudent: async (id) => {
    try {
      const response = await api.post(`/students/follow/${id}`, null);
      set(
        produce((state) => {
          state.student = response.data;
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
  unFollowStudent: async (id) => {
    try {
      const response = await api.post(`/students/follow/${id}`, null);
      set(
        produce((state) => {
          state.student = response.data;
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

export default student;
