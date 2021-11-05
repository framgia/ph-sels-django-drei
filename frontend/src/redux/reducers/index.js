import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import students from "./student";
import category from "./category";
import results from "./result";
import {
  categories,
  selectedCategory,
  selectedQuestion,
  questions,
  adminUserList,
} from "./admin";
export default combineReducers({
  auth: auth,
  profile: profile,
  students: students,
  categories: category,
  results: results,
  adminCategories: categories,
  adminSelectedCategory: selectedCategory,
  adminQuestions: questions,
  adminSelectedQuestion: selectedQuestion,
  adminUserList: adminUserList,
});
