import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

import News1 from "../../assets/News/news1.jpg";
import News2 from "../../assets/News/news2.png";
import News3 from "../../assets/News/news3.png";
import News4 from "../../assets/News/news4.png";

const useObserver = () => {
  const ref = useRef(null);
  const animation = useAnimation();

  const opacityVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animation.start("visible");
          } else {
            animation.start("hidden");
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animation]);

  return { ref, animation, opacityVariants };
};

function NewsBanner() {
  const { ref, animation, opacityVariants } = useObserver();
  const newsData = [
    {
      title: "美, '태양광·풍력' 전력 20% 생산…\"태양광 고속 성장\"",
      description:
        "미국에서 생산되는 전력 중 태양광과 풍력 발전 비중이 20% 이상인 것으로 조사됐다. 태양광 신규 발전량이 급증하고 있는 것이 배경으로 분석됐다.",
      imageUrl: News1,
    },
    {
      title: "확장하는 태양광 발전, 인류의 밤에 빛 선사할까",
      description:
        "한국에선 한때 “원전을 없애겠다”는 구실로 태양광 시설 설치를 마구 늘려 부작용이 속출했다. 하지만 세계 무대에선 태양광이 차세대 친환경 에너지의 대표 주자로 차츰 인정받는 분위기다.",
      imageUrl: News2,
    },
    {
      title: "AI models collapse when trained on recursively generated data",
      description:
        " It is now clear that generative artificial intelligence (AI) such as large language models (LLMs) is here to stay and will substantially change the ecosystem of online text and images. ",
      imageUrl: News3,
    },
    {
      title: "생성형 AI의 한계 ‘환각’, 대안으로 주목받는 RAG",
      description:
        "‘RAG(검색 증강 생성)’이 대안으로 주목받고 있다. 생성형 AI에서 발생하는 환각의 원인과 RAG를 비롯한 해결 방안에 대해 살펴본다.",
      imageUrl: News4,
    },
  ];

  return (
    <motion.div className="news-grid">
      {newsData.map((news, index) => (
        <motion.div
          className="news-container"
          key={index}
          ref={ref}
          initial="hidden"
          animate={animation}
          variants={opacityVariants}
        >
          <div className="news-image">
            <img src={news.imageUrl} alt="뉴스 이미지" />
          </div>
          <div className="news-content">
            <h2>{news.title}</h2>
            <p>{news.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
export default NewsBanner;
