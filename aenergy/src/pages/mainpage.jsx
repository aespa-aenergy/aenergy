import React from "react";
import "./css/mainpage.css";
import { motion } from "framer-motion";
//mainbanner
import arrow from "../assets/mainarrow.png";
import Backgroundmp4 from "../assets/bgvdo.mp4";
//carousel
import Slider from "react-slick";
import carousel1 from "../assets/carousel/carousel1.png";
import teamImage from "../assets/teamImg.png";

function MainBanner() {
  return (
    <div className="mainbanner">
      {/* <img src={BackgroundGif} alt="배너이미지" className="mainbanner_gif" /> */}
      <video autoPlay loop muted>
        <source
          src={Backgroundmp4}
          type="video/mp4"
          className="mainbanner_gif"
        />
      </video>
      <div className="mainbanner_text">
        <div>
          <p>에너지관리의 혁신,</p>
          <p>aenergy에서 시작하세요</p>
        </div>
      </div>
      <motion.div
        className="mainbanner_arrow_container"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img src={arrow} alt="아래로 이동" className="mainbanner_arrow" />
      </motion.div>
    </div>
  );
}

function CarouselBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src={carousel1} alt="Slide 1" />
        </div>
        <div>
          <div className="banner-content">
            <div className="banner-item1">
              <h3>가치 창출</h3>
              <p>
                공유한 지식이 에너지 효율성 향상과 신재생 에너지 활용 극대화로
                이어지기를 기대합니다. aenergy는 혁신을 촉진하여 지역사회와
                환경에 긍정적인 영향을 미칩니다. 지속 가능한 미래를 위한 새로운
                에너지 솔루션을 개발합니다.
              </p>
            </div>
            <div className="banner-item1">
              <h3>연구 및 개발</h3>
              <p>
                aenergy는 지속 가능한 에너지 솔루션을 연구하고 개발합니다. 최신
                에너지 기술, 에너지 저장 시스템, 스마트 그리드 기술 등 다양한
                프로젝트를 수행하여 신재생 에너지 활용도를 극대화합니다.
              </p>
            </div>
            <div className="banner-item1">
              <h3>고객 지원</h3>
              <p>
                aenergy는 최상의 고객 지원 서비스를 제공합니다. 에너지 관리 관련
                문의에 신속하고 정확하게 답변하며, 사용자 피드백을 반영하여
                서비스를 개선합니다.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="banner-content2">
            <h2>데이터의 힘으로 미래를 예측합니다.</h2>
            <div className="stats-container">
              <div className="banner-item2">
                <h3>20,000+</h3>
                <p>사용량</p>
              </div>
              <div className="banner-item2">
                <h3>20,000+</h3>
                <p>사용량</p>
              </div>
              <div className="banner-item2">
                <h3>20,000+</h3>
                <p>사용량</p>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-content3">
          <h2>
            aenergy의 혁신 뒤에는 aespa 팀이 있습니다. <br /> aenergy의 창의적인
            개발자들이 궁금하신가요?
          </h2>
          <button className="team-button">팀원 소개 보기</button>
          <img src={teamImage} alt="Team" className="team-image" />
        </div>
      </Slider>
    </div>
  );
}

function Mainpage() {
  return (
    <>
      <div className="main-mainBanner">
        <MainBanner />
      </div>
      <div className="main-carousel">
        <CarouselBanner />
      </div>
    </>
  );
}

export default Mainpage;
