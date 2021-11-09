import api from "../api";
import { produce } from "immer";
import { getFromLocalStorage } from "../utils";

const auth = (set, get) => ({
  isLoggedIn: getFromLocalStorage().isLoggedIn,
  userData: getFromLocalStorage().userData,

  signIn: async (formValues) => {
    try {
      const response = await api.post("/auth/token/", formValues);
      set(
        produce((state) => {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ isLoggedIn: true, userData: response.data })
          );
          state.isLoggedIn = true;
          state.userData = response.data;
          state.status.loading = false;
          state.status.errorMessage = "";
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errorMessage = err.response.data;
          state.status.loading = false;
        })
      );
    }
  },
  signOut: async () => {
    await api.post("/auth/logout/", { refresh: get().userData.refresh });
    set(
      produce((state) => {
        state.isLoggedIn = false;
        state.userData = {};
        localStorage.removeItem("userInfo");
      })
    );
  },
  signUp: async (formValues) => {
    try {
      await api.post("/signup/", formValues);
      set(
        produce((state) => {
          state.status.successMessage = "Sign up successful";
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

export default auth;
