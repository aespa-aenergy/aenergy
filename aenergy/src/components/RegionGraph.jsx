import React from "react";
import ZoomGraph from "./zoomGraph.jsx";

function SelectYearGraph({
  view,
  region,
  regions,
  onViewChange,
  onRegionChange,
  graphData,
}) {
  console.log("Rendering SelectYearGraph with:", { view, region, graphData });

  // 데이터 유효성 검사
  if (!graphData || Object.keys(graphData).length === 0) {
    console.error("Invalid graphData in SelectYearGraph:", graphData);
    return <div>No data available for the selected options.</div>;
  }

  return (
    <div className="select-year-graph">
      <div className="select-year">
        <span>그래프</span> <span>|</span>
        <select value={view} onChange={onViewChange}>
          <option value="production">발전량</option>
          <option value="consumption">소비량</option>
        </select>
        <select value={region} onChange={onRegionChange}>
          {regions.map((regionName) => (
            <option key={regionName} value={regionName}>
              {regionName}
            </option>
          ))}
        </select>
      </div>
      <ZoomGraph className="zoom-graph" data={graphData} />
      <hr />
    </div>
  );
}

export default SelectYearGraph;
