import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import students from "./student";
import {category,selectedCategory} from "./category";
export default combineReducers({
  auth: auth,
  profile: profile,
  students: students,
  categories: category,
  selectedCategory: selectedCategory
});
