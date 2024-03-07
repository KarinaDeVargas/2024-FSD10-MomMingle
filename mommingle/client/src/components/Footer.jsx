import React from "react";
import Logo from "../images/logo-no-bg.png";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full p-4 text-center bg-pastel-peach bg-opacity-95 flex items-center justify-center">
      <img src={Logo} alt="Mommingle Logo" className="h-6 w-auto mr-2" />
      <span>
        MomMingle made with ♥️ and <b>MomMingle</b>.
      </span>
    </footer>
  );
};

export default Footer;
