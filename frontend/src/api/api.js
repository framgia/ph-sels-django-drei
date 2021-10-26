import axios from "axios";
import { store } from "../index";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const token = state.auth?.userData?.access
      ? state.auth.userData.access
      : null;
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
