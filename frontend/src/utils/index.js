const required = (value) =>
  value ? undefined : <b style={{ color: "red" }}>This field is required</b>;

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
  "https://" + str.substring(31, str.length) &&
  "https://semantic-ui.com/images/avatar/large/justen.jpg";

const getFromLocalStorage = () => {
  if (localStorage.getItem("userInfo")) {
    return JSON.parse(localStorage.getItem("userInfo"));
  } else {
    return false;
  }
};

export { required, sleep, trimQuestion, tempStrFunction, getFromLocalStorage };
