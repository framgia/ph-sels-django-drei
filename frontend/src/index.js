import ReactDOM from "react-dom";

import App from "./App";
import { Router } from "react-router";
import history from "./history";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.querySelector("#root")
);
