import {
  ADMIN_CATEGORY_LIST,
  ADMIN_CATEGORY_DETAIL,
  ADMIN_UPDATE_CATEGORY,
  ADMIN_DELETE_CATEGORY,
  ADMIN_ADD_CATEGORY,
} from "../actions/types";
import _ from "lodash";

const categories = (state = { page: {}, categories: {} }, action) => {
  switch (action.type) {
    case ADMIN_CATEGORY_LIST:
      return {
        page: _.omit(action.payload, "results"),
        categories: _.mapKeys(action.payload.results, "id"),
      };
    case ADMIN_DELETE_CATEGORY:
      return { ...state, ..._.omit(state, action.payload.id) };
    default:
      return state;
  }
};

const selectedCategory = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADD_CATEGORY:
    case ADMIN_UPDATE_CATEGORY:
    case ADMIN_CATEGORY_DETAIL:
      return { ...action.payload };
    default:
      return state;
  }
};

export { categories, selectedCategory };
