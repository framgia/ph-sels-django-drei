import api from "../api";
import { produce } from "immer";
const profile = (set, get) => ({
  profile: {},
  getUserDetails: async (id) => {
    const response = await api.get(
      `/profile/${id ? id : get().userData.user_id}/`
    );
    set(
      produce((state) => {
        state.profile = response.data;
      })
    );
  },
  updateUserDetails: async (formValues) => {
    try {
      const userData = get().userData;
      const response = await api.patch(
        `/profile/${userData.user_id}/`,
        formValues
      );
      set(
        produce((state) => {
          state.status.errMessage = null;
          state.profile = response.data;
          state.status.loading = false;
          state.status.successMessage = "Profile has been saved succesfully";
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.successMessage = null;
          state.status.loading = false;
          state.status.errMessage = err.response.data;
        })
      );
    }
  },
});

export default profile;
