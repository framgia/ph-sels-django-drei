import {
  FETCH_CATEGORY_LIST,
  FETCH_CATEGORY,
  SUBMIT_ANSWER,
} from "../actions/types";
const category = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case FETCH_CATEGORY:
      return {
        ...state,
        ...action.payload,
      };
    case SUBMIT_ANSWER:
      return action.payload;
    default:
      return state;
  }
};

const selectedCategory = (state={},action) => {

  switch(action.type){
    case FETCH_CATEGORY:
      return {
        ...state,...action.payload,
      }
    default:
      return state
  }

}
export {category,selectedCategory};
