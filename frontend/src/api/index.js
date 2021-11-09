import axios from "axios";
import useStore from "../store/useStore";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use(
  async (config) => {
    const userData = useStore.getState().userData;
    const token = userData?.access ? userData.access : null;
    config.headers = {
      Authorization: token && `Bearer ${token}`,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
