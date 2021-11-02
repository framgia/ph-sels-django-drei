import {
  ADMIN_CATEGORY_LIST,
  ADMIN_CATEGORY_DETAIL,
  ADMIN_UPDATE_CATEGORY,
  ADMIN_DELETE_CATEGORY,
  ADMIN_ADD_CATEGORY,
  ADMIN_QUESTION_LIST,
  ADMIN_ADD_QUESTION,
  ADMIN_QUESTION_RETRIEVE,
  ADMIN_QUESTION_UPDATE,
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
      return { ..._.omit(state, action.payload.id) };
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

const questions = (state = { page: {}, categories: {} }, action) => {
  switch (action.type) {
    case ADMIN_QUESTION_LIST:
      return {
        page: _.omit(action.payload, "results"),
        questions: _.mapKeys(action.payload.results, "id"),
      };
    case ADMIN_DELETE_CATEGORY:
      return { ..._.omit(state, action.payload.id) };
    default:
      return state;
  }
};

const selectedQuestion = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADD_QUESTION:
    case ADMIN_QUESTION_RETRIEVE:
    case ADMIN_QUESTION_UPDATE:
      return { ...action.payload };
    default:
      return state;
  }
};

export { categories, selectedCategory, selectedQuestion, questions };
