import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../actions";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
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
        <NavLink to="/profile" className="ui item">
          Profile
        </NavLink>
        <button className="ui button primary" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
