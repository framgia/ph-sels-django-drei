import { SIGN_IN, SIGN_OUT } from "./types";
import api from "../api/api";

const signIn = (formValues) => async (dispatch) => {
  const response = await api.post("/auth/token/", formValues);
  dispatch({ type: SIGN_IN, payload: response.data });
};

const signOut = () => async (dispatch, getState) => {
  const { userData } = getState().auth;
  await api.post(
    "/auth/logout/",
    { refresh: userData.refresh },
    {
      headers: {
        Authorization: `Bearer ${userData.access}`,
      },
    }
  );
  dispatch({ type: SIGN_OUT });
};

export { signIn, signOut };
