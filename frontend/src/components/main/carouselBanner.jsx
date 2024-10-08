import React from "react";
import Slider from "react-slick";
import carousel1 from "../../assets/Banner/carousel1.png";
import teamImage from "../../assets/Banner/teamImg.png";

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
          <div className="banner-content">
            <div>
              {" "}
              <img src={carousel1} />
            </div>
          </div>
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
                <h3>100,000+</h3>
                <p>학습 데이터량</p>
              </div>
              <div className="banner-item2">
                <h3>21.0%</h3>
                <p>태양광 연평균 복합성장률 (CAGR)</p>
              </div>
              <div className="banner-item2">
                <h3>97.0%</h3>
                <p>최대 예측 모델 정확도</p>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-content3">
          <h2>
            aenergy의 혁신 뒤에는 aespa 팀이 있습니다. <br /> aenergy의 창의적인
            개발자들이 궁금하신가요?
          </h2>
          <a href="https://github.com/aespa-aenergy/aenergy"><button className="team-button">팀 소개 보기</button></a>
          <img src={teamImage} alt="Team" className="team-image" />
        </div>
      </Slider>
    </div>
  );
}

export default CarouselBanner;