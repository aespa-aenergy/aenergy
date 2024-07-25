import React from "react";
import { SimpleSouthKoreaMapChart } from "react-simple-south-korea-map-chart";

function Map() {
  const data = [
    { locale: "부산광역시", count: 1500 },
    { locale: "대구광역시", count: 3000 },
    { locale: "대전광역시", count: 400 },
    { locale: "강원도", count: 2500 },
    { locale: "광주광역시", count: 1000 },
    { locale: "경기도", count: 4000 },
    { locale: "인천광역시", count: 2200 },
    { locale: "제주특별자치도", count: 100 },
    { locale: "충청북도", count: 49 },
    { locale: "경상북도", count: 2000 },
    { locale: "전라북도", count: 3300 },
    { locale: "충청남도", count: 10 },
    { locale: "경상남도", count: 980 },
    { locale: "전라남도", count: 250 },
    { locale: "울산광역시", count: 100 },
    { locale: "서울특별시", count: 10000 },
  ];

  const setColorByCount = (count) => {
    if (count === 0) return "#F1F1F1";
    if (count > 5000) return "#364b7a";
    if (count > 3000) return "#64779f";
    if (count > 1000) return "#50679a";
    if (count > 200) return "#738cc1";
    if (count > 100) return "#a1b3db";
    if (count > 50) return "#c4cfe7";
    if (count > 5) return "#eff3fc";
    else return "#ebfffd";
  };

  return (
    <>
      <SimpleSouthKoreaMapChart setColorByCount={setColorByCount} data={data} />
    </>
  );
}

export default Map;