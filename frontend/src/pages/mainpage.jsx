import React from "react";
import "../assets/styles/pages/mainpage.css";

import MainBanner from "../components/main/mainBanner.jsx";
import CarouselBanner from "../components/main/carouselBanner.jsx";
import SolarPowerPlantMap from "../components/main/solarPowerPlantMap.jsx";
import NewsBanner from "../components/main/newsList.jsx";
import IconList from "../components/main/iconList.jsx";

function Mainpage() {
  return (
    <>
      <div className="main-mainBanner">
        <MainBanner />
      </div>
      <div className="main-solarPowerPlant">
        <SolarPowerPlantMap />
      </div>
      <div className="main-carousel">
        <CarouselBanner />
      </div>
      <div className="main-newsBanner">
        <NewsBanner />
      </div>
      <div className="main-iconList">
        <IconList />
      </div>
    </>
  );
}

export default Mainpage;
