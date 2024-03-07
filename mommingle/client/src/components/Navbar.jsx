import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../images/logo-no-background.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/events");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogoClick = () => {
    if (currentUser) {
      navigate("/events");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full">
      <nav
        className={`navbar flex items-center justify-between py-4 px-4 ${
          currentUser ? "block" : "hidden"
        } bg-pastel-peach bg-opacity-50`}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="flex items-center">
          <div className="logo" onClick={handleLogoClick}>
            <img src={Logo} alt="Logo" className="h-8 w-auto cursor-pointer" />
          </div>
          <div className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>
        {currentUser && (
          <div className="flex items-center">
            <ul className="flex space-x-4 mr-12">
              <li>
                <Link to="/events" className="text-blue-400 hover:text-pastel-blue">
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/createevent"
                  className="text-blue-400 hover:text-pastel-blue"
                >
                  Create Event
                </Link>
              </li>
            </ul>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
