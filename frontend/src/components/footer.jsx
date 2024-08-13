import React from "react";
import "../assets/styles/components/footer.css";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={Logo} alt="" />
          <hr />  
        </div>

        <div className="footer-links">
          <a href="#">Team</a>
          <a href="#">Case Studies</a>
          <a href="#">Publications</a>
        </div>
        <div className="footer-social">
          <a href="#">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
