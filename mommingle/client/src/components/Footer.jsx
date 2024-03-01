import React from "react";
import Logo from "../images/logo-color.png";
import "../style/style_css.css";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
      Mommingle made with ♥️ and <b>Mommingle</b>.
      </span>
    </footer>
  );
};

export default Footer;