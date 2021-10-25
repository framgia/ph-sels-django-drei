import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import studentReducer from "./studentReducer";
import categoryReducer from "./categoryReducer";
export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  students: studentReducer,
  categories: categoryReducer,
});
