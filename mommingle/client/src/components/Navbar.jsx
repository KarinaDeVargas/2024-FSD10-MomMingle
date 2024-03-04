import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../images/logo-no-background.png";
import "../style/style_css.css";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=social">
            <h6>SOCIAL</h6>
          </Link>
          <Link className="link" to="/?cat=culture">
            <h6>CULTURE</h6>
          </Link>
          <Link className="link" to="/?cat=fitness">
            <h6>FITNESS</h6>
          </Link>
          <Link className="link" to="/?cat=parenting">
            <h6>PARENTING</h6>
          </Link>
          <Link className="link" to="/?cat=playdate">
            <h6>PLAYDATE</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/createevent">
              Create Event
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
