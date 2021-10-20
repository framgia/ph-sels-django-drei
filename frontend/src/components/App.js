import React from "react";
import AuthForm from "./AuthForm";
import { Switch, Router, Route } from "react-router-dom";
import history from "../history";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import SignUpForm from "./SignUpForm";
import ProfileEditPage from "../pages/ProfileEditPage";
/*
TODO:
Refactor AuthForm and SignUpForm into a single form
Create email format validation on front end
MinValue validation for sign up fields in front-end
No frontend success message yet on api calls
*/
const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Switch>
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute exact path="/profile" component={ProfileEditPage} />
          <Route exact path="/signin" component={AuthForm} />
          <Route exact path="/signup" component={SignUpForm} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
