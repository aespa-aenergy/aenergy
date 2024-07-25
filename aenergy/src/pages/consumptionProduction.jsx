import React, { useState } from "react";
import Map from "../components/map.jsx";
import "./css/conpro.css";

function ConsumptionProduction() {
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
      </div>
      <div className="map-container">
        <Map year={year} month={month} view={view} />
      </div>
    </div>
  );
}

export default ConsumptionProduction;
