import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../actions";
import { Link } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signOut());
  };
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="active item">
        Home
      </Link>
      <Link to="/" className="item">
        Words
      </Link>
      <Link to="/" className="item">
        Friends
      </Link>
      <div className="right menu">
        <Link to="/profile" className="ui item">
          Profile
        </Link>
        <button className="ui button primary" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
