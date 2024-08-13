import React from "react";

function ToggleSwitch({ view, toggleView }) {
  return (
    <div className="toggle-switch" onClick={toggleView}>
      <div className={`toggle-switch-knob ${view}`}></div>
      <span className={`toggle-switch-label ${view === "consumption" ? "active" : ""}`}>
        소비량
      </span>
      <span className={`toggle-switch-label ${view === "production" ? "active" : ""}`}>
        발전량
      </span>
    </div>
  );
}

export default ToggleSwitch;