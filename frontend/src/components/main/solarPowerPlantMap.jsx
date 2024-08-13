import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SimpleSouthKoreaMapChart } from "react-simple-south-korea-map-chart";

const useObserver = () => {
  const ref = useRef(null);
  const animation = useAnimation();

  const opacityVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animation.start("visible");
          } else {
            animation.start("hidden");
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animation]);

  return { ref, animation, opacityVariants };
};
function SolarPowerPlantMap() {
  const { ref, animation, opacityVariants } = useObserver();
  const mapData = [
    { locale: "서울특별시", count: 554, unit: "개" },
    { locale: "경기도", count: 13800, unit: "개" },
    { locale: "인천광역시", count: 904, unit: "개" },
    { locale: "강원도", count: 10077, unit: "개" },
    { locale: "충청북도", count: 12179, unit: "개" },
    { locale: "세종특별자치시", count: 505, unit: "개" },
    { locale: "충청남도", count: 21123, unit: "개" },
    { locale: "대전광역시", count: 645, unit: "개" },
    { locale: "울산광역시", count: 632, unit: "개" },
    { locale: "경상북도", count: 24030, unit: "개" },
    { locale: "대구광역시", count: 2284, unit: "개" },
    { locale: "부산광역시", count: 1001, unit: "개" },
    { locale: "경상남도", count: 11972, unit: "개" },
    { locale: "전라북도", count: 33562, unit: "개" },
    { locale: "광주광역시", count: 1927, unit: "개" },
    { locale: "전라남도", count: 23852, unit: "개" },
    { locale: "제주특별자치도", count: 1707, unit: "개" },
  ];
  const data = [
    { name: "서울경기권", count: 15066 },
    { name: "강원권", count: 10036 },
    { name: "충청권", count: 34309 },
    { name: "영남권", count: 39549 },
    { name: "호남제주권", count: 60728 },
  ];

  const COLORS = ["#cfc5b2", "#cfb3b2", "#8fb091", "#8fa7b8", "#a090b0"];
  const setColorByCount = (count) => {
    if (count > 30000) return "#425b42";
    if (count > 20000) return "#517151";
    if (count > 10000) return "#588e58";
    if (count > 5000) return "#74ae74";
    if (count > 1000) return "#8ed08e";
    else return "#d8eddc";
  };
  return (
    <>
      <div className="plant-map-container">
        <motion.div
          className="plant-current-status"
          ref={ref}
          initial="hidden"
          animate={animation}
          variants={opacityVariants}
        >
          <div className="map-description">
            <h1>전국 태양광 발전소 현황을 확인하세요!</h1>
            <p>
              2024.08.13 기준으로 전국 태양광 발전소 현황을 지도로 표시했습니다.
            </p>
            <p>지도에 마우스를 올려 상세 정보를 확인해보세요!</p>
          </div>
          <div className="plant-chart">
            <div className="total-plant">
              <h2>전국 태양광 발전소</h2>
              <h3>160,754개소</h3>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}개소`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        <div className="plant-map">
          <SimpleSouthKoreaMapChart
            setColorByCount={setColorByCount}
            data={mapData}
            unit="개"
          />
        </div>
      </div>
    </>
  );
}
export default SolarPowerPlantMap;
