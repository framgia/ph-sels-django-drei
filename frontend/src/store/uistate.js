import { produce } from "immer";

const uistate = (set, get) => ({
  status: { loading: false, errMessage: null, successMessage: null },
  setLoading: (status) => {
    set(
      produce((state) => {
        state.status.loading = status;
      })
    );
  },
  clearMessages: () => {
    set(
      produce((state) => {
        state.status.errMessage = null;
        state.status.successMessage = null;
      })
    );
  },
});

export default uistate;
