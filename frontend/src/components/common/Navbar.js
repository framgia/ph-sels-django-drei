import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/actions/user";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(signOut());
  };

  return (
    <div className="ui secondary pointing menu">
      <NavLink exact to="/" className="item" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/students" className="item" activeClassName="active">
        Students
      </NavLink>
      <NavLink to="/categories" className="item" activeClassName="active">
        Categories
      </NavLink>
      <div className="right menu">
        <NavLink to="/results" className="ui item">
          Results
        </NavLink>
        <NavLink to="/profile" className="ui item">
          Profile
        </NavLink>
        {auth.userData?.is_admin ? (
          <NavLink to="/admin" className="ui item">
            Admin
          </NavLink>
        ) : null}
        <button
          className="ui button item"
          style={{ color: "red" }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
