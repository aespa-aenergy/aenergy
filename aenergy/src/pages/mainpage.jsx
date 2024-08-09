import React from "react";
import "../assets/styles/pages/mainpage.css";

import MainBanner from "../components/Banner/mainBanner.jsx";
import CarouselBanner from "../components/Banner/carouselBanner.jsx";
import SolarPowerPlantMap from "../components/Banner/solarPowerPlantMap.jsx";
import NewsBanner from "../components/Banner/newsList.jsx";

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
    </>
  );
}

export default Mainpage;
