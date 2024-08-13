import React, { useState, useEffect } from "react";
import { SimpleSouthKoreaMapChart } from "react-simple-south-korea-map-chart";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import productionData from "../data/transformed_karina.json"; // 발전량 데이터
import consumptionData from "../data/transformed_winter.json"; // 소비량 데이터
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
  const [selectedData, setSelectedData] = useState([]);
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
    세종특별자치시: "Sejong",
  };

  useEffect(() => {
    const dateKey = `${year}-${String(month).padStart(2, "0")}-01`;
    const data = mapView === "production" ? productionData : consumptionData;
    const selected = data[dateKey] || {};
    const transformedData = Object.keys(selected).map((locale) => ({
      locale:
        Object.keys(regionMapping).find(
          (key) => regionMapping[key] === locale
        ) || locale,
      count: selected[locale] || 0,
      unit: "MWh",
    }));

    setSelectedData(transformedData);
  }, [year, month, mapView]);

  const handleYearChange = (e) => setYear(parseInt(e.target.value));
  const handleMonthChange = (month) => setMonth(month);
  const toggleMapView = () =>
    setMapView(mapView === "consumption" ? "production" : "consumption");
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

  const setColorByCount = (count) => {
    if (mapView === "production") {
      if (count > 500000) return "#5d9164";
      if (count > 200000) return "#65a86f";
      if (count > 100000) return "#75c981";
      if (count > 50000) return "#8cd196";
      if (count > 10000) return "#a3d9ab";
      else return "#f0fced";
    } else {
      if (count > 10000000) return "#4d89b3";
      if (count > 3000000) return "#5e97bf";
      if (count > 2000000) return "#6fadd9";
      if (count > 1000000) return "#7fbeeb";
      if (count > 100000) return "#90cbf5";
      else return "#E8F5FF";
    }
  };

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

      <div className="map-container">
        <ToggleSwitch
          view={mapView}
          toggleView={toggleMapView}
          className="map-toggle-switch"
        />

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
          <SimpleSouthKoreaMapChart
            data={selectedData}
            unit="MWh"
            setColorByCount={setColorByCount}
            className="map-component"
          />
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
