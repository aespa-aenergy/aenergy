import React from "react";
import { motion} from "framer-motion";

import arrow from "../../assets/Banner/mainarrow.png";
import Backgroundmp4 from "../../assets/Banner/bgvdo.mp4";
function MainBanner() {
  return (
    <div className="mainbanner">
      <video autoPlay loop muted>
        <source
          src={Backgroundmp4}
          type="video/mp4"
          className="mainbanner_gif"
        />
      </video>
      <div className="mainbanner_text">
        <div>
          <p>에너지관리의 혁신,</p> <br/>
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

export default MainBanner;