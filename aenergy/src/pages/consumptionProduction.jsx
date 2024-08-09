import React, { useState, useEffect } from "react";
import Map from "../components/map.jsx";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import productionData from "../data/transformed_karina.json"; // 발전량 데이터
import consumptionData from "../data/transformed_winter.json"; // 소비량 데이터
import ZoomGraph from "../components/zoomGraph.jsx";
import RegionMonthProduction from "../data/measure.json";
import RegionMonthConsumption from "../data/power_prediction_data.json";
import ToggleSwitch from "../components/toggleSwitch";
import SelectYearGraph from "../components/RegionGraph.jsx";
import RecommendChatbot from "../components/recommendChatbot";
import "../assets/styles/pages/conpro.css";

function ConsumptionProduction() {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(8);
  const [mapView, setMapView] = useState("production"); // Map에서 사용할 view 상태
  const [graphView, setGraphView] = useState("production"); // Graph에서 사용할 view 상태
  const [selectedData, setSelectedData] = useState({});
  const [region, setRegion] = useState("서울특별시");

  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const regionMapping = {
    서울특별시: "Seoul",
    경기도: "Gyeonggi",
    인천광역시: "Incheon",
    강원도: "Gangwon",
    충청북도: "Chungbuk",
    충청남도: "Chungnam",
    대전광역시: "Daejeon",
    경상북도: "Gyeongbuk",
    대구광역시: "Daegu",
    경상남도: "Gyeongnam",
    울산광역시: "Ulsan",
    부산광역시: "Busan",
    전라북도: "Jeonbuk",
    광주광역시: "Gwangju",
    전라남도: "Jeonnam",
    제주특별자치도: "Jeju",
  };

  useEffect(() => {
    const dateKey = `${year}-${String(month).padStart(2, "0")}-01`;
    const data = mapView === "production" ? productionData : consumptionData;
    setSelectedData(data[dateKey] || {});
  }, [year, month, mapView]);

  const handleYearChange = (e) => setYear(parseInt(e.target.value));
  const handleMonthChange = (month) => setMonth(month);
  const toggleMapView = () => setMapView(mapView === "consumption" ? "production" : "consumption");
  const handleGraphViewChange = (e) => setGraphView(e.target.value);
  const handleRegionChange = (e) => setRegion(e.target.value);

  const getGraphData = () => {
    const mappedRegion = regionMapping[region];
    return graphView === "production"
      ? RegionMonthProduction[mappedRegion]
      : RegionMonthConsumption[mappedRegion];
  };

  const navigate = useNavigate();
  const handleClickChatPage = () => navigate("/chat");

  return (
    <div className="consumption-production-container">
      <div className="nav-bar">
        <select value={year} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="months">
          {months.map((m) => (
            <button
              key={m}
              className={m === month ? "active" : ""}
              onClick={() => handleMonthChange(m)}
            >
              {m}월
            </button>
          ))}
        </div>
      </div>
      
      <ToggleSwitch view={mapView} toggleView={toggleMapView} />

      <div className="map-container">
        <motion.div
          className="map"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Map data={selectedData} view={mapView} />
        </motion.div>
      </div>

      <SelectYearGraph
        view={graphView}
        region={region}
        regions={Object.keys(regionMapping)}
        onViewChange={handleGraphViewChange}
        onRegionChange={handleRegionChange}
        graphData={getGraphData()}
      />

      <RecommendChatbot onClickChatPage={handleClickChatPage} />
    </div>
  );
}

export default ConsumptionProduction;
