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
          <p>에너지관리의 혁신,</p>
          <p>aenergy에서 시작하세요</p>
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
