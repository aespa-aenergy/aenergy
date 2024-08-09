import React from "react";
import { SimpleSouthKoreaMapChart } from "react-simple-south-korea-map-chart";
const localeNameMapping = {
  Gangwon: "강원도",
  Gyeonggi: "경기도",
  Gyeongnam: "경상남도",
  Gyeongbuk: "경상북도",
  Gwangju: "광주광역시",
  Daegu: "대구광역시",
  Daejeon: "대전광역시",
  Busan: "부산광역시",
  Seoul: "서울특별시",
  Sejong: "세종특별자치시",
  Ulsan: "울산광역시",
  Incheon: "인천광역시",
  Jeonnam: "전라남도",
  Jeonbuk: "전라북도",
  Jeju: "제주특별자치도",
  Chungnam: "충청남도",
  Chungbuk: "충청북도",
};
function Map({ data, view }) {
  const formattedData = Object.entries(data).map(([locale, count]) => ({
    locale: localeNameMapping[locale] || locale, // locale을 한글 이름으로 변경
    count: count,
    unit: view === "consumption" ? "Mwh" : "Mwh", // 필요시 unit을 다르게 설정
  }));

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
      <SimpleSouthKoreaMapChart
        setColorByCount={setColorByCount}
        data={formattedData}
      />
    </>
  );
}

export default Map;
