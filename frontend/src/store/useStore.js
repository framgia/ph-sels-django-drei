import create from "zustand";
import { devtools } from "zustand/middleware";
import auth from "./auth";
import profile from "./profile";
import uistate from "./uistate";
import student from "./student";
import result from "./result";
import category from "./category";
import admin from "./admin";
const store = (set, get) => ({
  ...auth(set, get),
  ...profile(set, get),
  ...student(set, get),
  ...result(set, get),
  ...category(set, get),
  ...admin(set, get),
  ...uistate(set, get),
});

const useStore = create(devtools(store), { name: "My store" });

export default useStore;
