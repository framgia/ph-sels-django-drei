import { useLocation } from "react-router";
import faker from "faker";

const required = (value) =>
  value ? undefined : (
    <p style={{ color: "red", float: "left", margin: "10px" }}>
      This field is required
    </p>
  );

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//Remove first unwanted character
const trimQuestion = (values) => {
  let val = {};
  for (const [key, value] of Object.entries(values)) {
    val[parseInt(key.replace("question ", ""))] = value;
  }
  return val;
};

const tempStrFunction = (str) =>
  "https://" + str.substring(31, str.length) && faker.image.avatar();

const getFromLocalStorage = () => {
  if (localStorage.getItem("userInfo")) {
    return JSON.parse(localStorage.getItem("userInfo"));
  } else {
    return false;
  }
};
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const timeSince = (dateObj) => {
  const date = new Date(dateObj);
  function fromNow(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      const month = date.toLocaleString("default", { month: "long" });

      return month + " " + date.getDate() + " " + date.getFullYear();
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      const month = date.toLocaleString("default", { month: "long" });
      return month + " " + date.getDate();
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    // return Math.floor(seconds) + " seconds ago";
    return " just now";
  }
  const result = fromNow(date);

  return <>{result}</>;
};

const validatePasswordMatch = (values) => {
  const errors = {};
  if (values.password !== values.password2) {
    errors.password2 = "Password does not match";
  }

  return errors;
};
export {
  required,
  sleep,
  trimQuestion,
  tempStrFunction,
  getFromLocalStorage,
  useQuery,
  timeSince,
  validatePasswordMatch,
};
