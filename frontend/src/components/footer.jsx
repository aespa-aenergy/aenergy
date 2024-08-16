import React from "react";
import "../assets/styles/components/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-logo">aenergy</span>
        </div>
        <div className="footer-center">
          <span className="footer-info">Request More Information</span>
        </div>
        <div className="footer-right">
          <a href="#" className="social-icon linkedin"></a>
          <a href="#" className="social-icon facebook"></a>
          <a href="#" className="social-icon instagram"></a>
          <a href="#" className="social-icon youtube"></a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2024 aespa</span>
      </div>
    </footer>
  );
};

export default Footer;
