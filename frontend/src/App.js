import React from "react";
import AuthForm from "./pages/Login/AuthForm";
import { Switch, Router, Route } from "react-router-dom";
import history from "./history";
import HomePage from "./pages/Home/HomePage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import SignUpForm from "./pages/Login/SignUpForm";
import ProfileEditPage from "./pages/Profile/ProfileEditPage";
import StudentListPage from "./pages/Students/StudentListPage";
import StudentProfilePage from "./pages/Students/StudentProfilePage";
import CategoryList from "./pages/Categories/CategoryList";
import CategoryDetail from "./pages/Categories/CategoryDetail";
/*
TODO:

Refactor AuthForm and SignUpForm into a single form
Create email format validation on front end
MinValue validation for sign up fields in front-end
No frontend success message yet on api calls

What if i modify the localStorage to bypass authentication
*/
const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Switch>
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute path="/profile" component={ProfileEditPage} />
          <ProtectedRoute exact path="/students" component={StudentListPage} />
          <ProtectedRoute
            path="/students/profile/:id"
            component={StudentProfilePage}
          />
          <ProtectedRoute exact path="/categories" component={CategoryList} />
          <ProtectedRoute path="/categories/:id" component={CategoryDetail} />
          <Route path="/signin" component={AuthForm} />
          <Route path="/signup" component={SignUpForm} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
