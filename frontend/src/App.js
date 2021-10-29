import React from "react";
import AuthForm from "./pages/Login/AuthForm";
import { Switch, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ProtectedCourseRoute from "./components/common/ProtectedCourseRoute";
import AdminOnlyRoute from "./components/common/AdminOnlyRoute";
import SignUpForm from "./pages/Login/SignUpForm";
import ProfileEditPage from "./pages/Profile/ProfileEditPage";
import StudentListPage from "./pages/Students/StudentListPage";
import StudentProfilePage from "./pages/Students/StudentProfilePage";
import CategoryList from "./pages/Categories/CategoryList";
import CategoryDetail from "./pages/Categories/CategoryDetail";
import ResultList from "./pages/Results/ResultList";
import ResultDetail from "./pages/Results/ResultDetail";
import Navbar from "./components/common/Navbar";

//Admin Pages
import AdminCategoryList from "./pages/Admin/Categories/AdminCategoryList";
import AdminCategoryDetail from "./pages/Admin/Categories/AdminCategoryDetail";
import AdminCategoryAdd from "./pages/Admin/Categories/AdminCategoryAdd";
/*
TODO:

Refactor AuthForm and SignUpForm into a single form
Create email format validation on front end
MinValue validation for sign up fields in front-end
No frontend success message yet on api calls

What if i modify the localStorage to bypass authentication
*/
const App = () => {
  const location = useLocation();

  return (
    <div className="ui container">
      {(location.pathname && location.pathname === "/signup") ||
      location.pathname === "/signin" ? null : (
        <Navbar />
      )}
      <Switch>
        <ProtectedRoute exact path="/" component={HomePage} />
        <ProtectedRoute path="/profile" component={ProfileEditPage} />
        <ProtectedRoute exact path="/students" component={StudentListPage} />
        <ProtectedRoute
          path="/students/profile/:id"
          component={StudentProfilePage}
        />
        <ProtectedRoute exact path="/results" component={ResultList} />
        <ProtectedCourseRoute path="/results/:id" component={ResultDetail} />
        <ProtectedRoute exact path="/categories" component={CategoryList} />
        <ProtectedCourseRoute
          path="/categories/:id"
          component={CategoryDetail}
        />

        <AdminOnlyRoute
          exact
          path="/admin/categories/"
          component={AdminCategoryList}
        />
        <AdminOnlyRoute
          path="/admin/categories/add"
          component={AdminCategoryAdd}
        />
        <AdminOnlyRoute
          path="/admin/categories/:id"
          component={AdminCategoryDetail}
        />
        <Route path="/signin" component={AuthForm} />
        <Route path="/signup" component={SignUpForm} />
      </Switch>
    </div>
  );
};

export default App;
