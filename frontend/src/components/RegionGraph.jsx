import React, { useState } from "react";
import ZoomGraph from "./zoomGraph.jsx";
import SolarPower from "../assets/solarpower.jpg";

function SelectYearGraph({
  view,
  region,
  regions,
  onViewChange,
  onRegionChange,
  graphData,
}) {
  const [error, setError] = useState(null); // 에러 메시지 상태 추가

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;

    if (view === "consumption" && selectedRegion === "세종특별자치시") {
      setError("죄송합니다, 세종시의 전력 소비량 데이터를 구하지 못하였어요.");
      setTimeout(() => {
        onRegionChange({ target: { value: "서울특별시" } }); // "서울특별시"로 자동 변경
        setError(null); // 에러 메시지 초기화
      }, 2000); // 2초 후에 자동 변경 및 에러 메시지 제거
    } else {
      setError(null); // 에러 메시지 초기화
      onRegionChange(event); // 선택된 값으로 변경
    }
  };

  // 데이터 유효성 검사
  if (!graphData || Object.keys(graphData).length === 0) {
    console.error("Invalid graphData in SelectYearGraph:", graphData);
    return <div>No data available for the selected options.</div>;
  }

  return (
    <div className="select-year-graph">
      <hr />
      <div className="select-year">
        <span>그래프</span> <span>|</span>
        <select value={view} onChange={onViewChange}>
          <option value="production">발전량</option>
          <option value="consumption">소비량</option>
        </select>
        <select value={region} onChange={handleRegionChange}>
          {regions.map((regionName) => (
            <option key={regionName} value={regionName}>
              {regionName}
            </option>
          ))}
        </select>
        <p>단위: Mwh</p>
        {error && (
          <p style={{ color: "#b3bfc9"}}>{error}</p>
        )}
      </div>
      <hr />
      <div className="zoom-graph">
        <hr />
        <ZoomGraph className="zoom-graph" data={graphData} view={view} />{" "}
        {/* view prop 전달 */}
      </div>
      <div className="zoom-graph-description-container">
        <div class="graph-description-image">
          <img src={SolarPower} />
        </div>
        <div class="graph-description">
          <h2>AENERGY 예측 그래프</h2>
          <p>
            위 그래프는 향후 3년(2024년 ~ 2026년) 동안의 태양광 발전량과
            소비량을 예측한 것입니다. 발전량 예측은 2019년 1월부터 2023년
            12월까지의 데이터를 학습한 결과를 바탕으로 하였으며, 소비량 예측은
            2002년부터 2023년까지의 데이터를 학습하여 도출되었습니다. 저희는
            주가 및 주택 가격 예측 등에 사용되는 <b>계절성 ARIMA 모델을</b>{" "}
            적용하여, 계절적인 변동을 고려한 시계열 데이터를 바탕으로 발전량과
            소비량을 추정하였습니다. 이를 통해 태양광 발전의 향후 가능성과 투자
            방향성을 시각적으로 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SelectYearGraph;
