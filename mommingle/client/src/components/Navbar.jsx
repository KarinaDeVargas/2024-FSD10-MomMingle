import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../images/logo-no-background.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser) {
      // Assuming currentUser contains user data including the role
      setIsAdmin(currentUser.role === "admin");
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
        </div>
        {currentUser && (
          <div className="flex items-center">
            <ul className="flex space-x-4 mr-12">
              <li>
                <Link
                  to="/messages"
                  className="text-pastel-salmon hover:text-pastel-pink"
                >
                  Messages
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-pastel-salmon hover:text-pastel-pink"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/createevent"
                  className="text-pastel-salmon hover:text-pastel-pink"
                >
                  Create Event
                </Link>
              </li>
              <li>
                <Link
                  to="/searchevent"
                  className="text-pastel-salmon hover:text-pastel-pink"
                >
                  Search Event
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    to="/admin"
                    className="text-pastel-salmon hover:text-pastel-pink"
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="py-2 px-4 bg-pastel-darker-blue text-white font-semibold rounded hover:bg-blue-500"
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
