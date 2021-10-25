import { FETCH_CATEGORY_LIST } from "../actions/types";
const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_LIST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
