import React, { useState } from "react";
import Map from "../components/map.jsx";
import "./css/conpro.css";
import { motion } from "framer-motion";
import LineGraph from "../components/lineGraph.jsx";
import { Link, useNavigate } from "react-router-dom";

function ConsumptionProduction() {
  const navigate = useNavigate();

  function handleClickChatPage() {
    navigate("/chat");
  }

  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(8);
  const [view, setView] = useState("consumption"); // 기본 값은 소비량

  const years = [2023, 2024, 2025, 2026, 2027];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  const handleMonthChange = (month) => {
    setMonth(month);
  };

  const toggleView = () => {
    setView(view === "consumption" ? "production" : "consumption");
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
        <div className="toggle-switch" onClick={toggleView}>
          <div className={`toggle-switch-knob ${view}`}></div>
          <span
            className={`toggle-switch-label ${
              view === "consumption" ? "active" : ""
            }`}
          >
            소비량
          </span>
          <span
            className={`toggle-switch-label ${
              view === "production" ? "active" : ""
            }`}
          >
            발전량
          </span>
        </div>
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
          <Map year={year} month={month} view={view} />
        </motion.div>
      </div>

      <div className="select-year-graph">
        <div className="select-year">
          <span>그래프</span> <span>|</span>
          <select>
            <option value="발전량">발전량</option>
            <option value="소비량">소비량</option>
          </select>
          <select value={year} onChange={handleYearChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <span> ~ </span>
          <select value={year} onChange={handleYearChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="selected-year-graph">
          <LineGraph />
        </div>
        <hr />
      </div>
      <div className="recommend-chatbot">
        <h1>스마트하게 태양광 발전소 부지를 선정하세요! </h1>
        <h1>최신 AI 기술과 데이터 분석이 도와드립니다.</h1>
        <div className="chatbot-text">
          <p>
            aenergy의 챗봇은 최신 인공지능 기술과 수많은 데이터를 기반으로
            태양광 발전소 부지를 예측합니다.
          </p>
          <p>
            과학적 데이터와 인공지능의 힘을 결합하여 여러분의 태양광 발전소가
            가장 효율적인 위치에 자리 잡을 수 있도록 돕겠습니다.
          </p>
          <button className="chatbot-btn" onClick={handleClickChatPage}>챗봇으로 추천받기</button>
        </div>
      </div>
    </div>
  );
}

export default ConsumptionProduction;
