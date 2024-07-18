import React from "react";
import BackgroundGif from "../assets/background_gif.gif";
import arrow from "../assets/mainarrow.png";
import "./css/MainBanner.css";

const MainBanner = () => {
  return (
    <div className="mainbanner">
      <img src={BackgroundGif} alt="배너이미지" className="mainbanner_gif" />
      <div className="mainbanner_text">
        <div>
          <h1>에너지 관리의 혁신</h1>
          <h1>aenergy에서 시작하세요</h1>
        </div>
        <div>
          <button className="mainbanner_btn">explore</button>
        </div>
      </div>
      <div className="mainbanner_arrow_container">
        <img src={arrow} alt="아래로 이동" className="mainbanner_arrow" />
      </div>
    </div>
  );
};

export default MainBanner;
