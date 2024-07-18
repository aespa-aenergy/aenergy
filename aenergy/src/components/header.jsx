import React from "react";
import { Link } from "react-router-dom";
import "./css/header.css";
import Logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="header_container">
        <div className="header_logo">
          <Link to="/">
            <img src={Logo} alt="로고 이미지" />
          </Link>
        </div>
        <nav className="header_nav">
          <Link to="/team">팀 소개</Link>
          <Link to="/consumption">지역별 사용량</Link>
          <Link to="/production">지역별 발전량</Link>
          <Link to="/graphs">그래프</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
