import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/styles/components/header.css";
import Logo from "../assets/logo.png";

function Header() {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  

  return (
    <header className={`header ${isMainPage ? 'header-transparent' : ''}`}>
      <div className="header_container">
        <div className="header_logo">
          <Link to="/">
            <img src={Logo} alt="로고 이미지" />
          </Link>
        </div>
        <nav className="header_nav">
          <Link to="/mapchart">지도 통계</Link>
          <Link to="/chat">부지 추천</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
