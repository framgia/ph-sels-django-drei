import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import studentReducer from "./studentReducer";
export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  students: studentReducer,
});
