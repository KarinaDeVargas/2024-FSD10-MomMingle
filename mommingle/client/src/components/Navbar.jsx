import React from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../context/authContext";
import Logo from "../images/logo-no-background.png";
import "../style/style_css.css";


const Navbar = () => {
  // const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6> 
          </Link>
          {/* from "SCIENCE" to category "zumba" */}
          <Link className="link" to="/?cat=zumba">
            <h6>ZUMBA</h6>
          </Link>
          {/* from "TECHNOLOGY" to category "MEDITATION" */}
          <Link className="link" to="/?cat=meditation">
            <h6>MEDITATION</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          {/* from "design" to category "Playdate" */}
          <Link className="link" to="/?cat=playdate">
            <h6>PLAYDATE</h6> 
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          {/* <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : ( */}
            <Link className="link" to="/login">
              Login
            </Link>
          {/* )} */}
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
