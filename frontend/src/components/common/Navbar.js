import React from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../store/useStore";
const Navbar = () => {
  const signOut = useStore((state) => state.signOut);
  const userData = useStore((state) => state.userData);

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
        {userData?.is_admin ? (
          <NavLink to="/admin" className="ui item">
            Admin
          </NavLink>
        ) : null}
        <button
          className="ui button item"
          style={{ color: "red" }}
          onClick={signOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
