import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
    { locale: "경기도", count: 13617, unit: "개" },
    { locale: "인천광역시", count: 895, unit: "개" },
    { locale: "강원도", count: 10036, unit: "개" },
    { locale: "충청북도", count: 12123, unit: "개" },
    { locale: "세종특별자치시", count: 505, unit: "개" },
    { locale: "충청남도", count: 21038, unit: "개" },
    { locale: "대전광역시", count: 643, unit: "개" },
    { locale: "울산광역시", count: 621, unit: "개" },
    { locale: "경상북도", count: 23879, unit: "개" },
    { locale: "대구광역시", count: 2261, unit: "개" },
    { locale: "부산광역시", count: 899, unit: "개" },
    { locale: "경상남도", count: 11889, unit: "개" },
    { locale: "전라북도", count: 33437, unit: "개" },
    { locale: "광주광역시", count: 1906, unit: "개" },
    { locale: "전라남도", count: 23678, unit: "개" },
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
  const powerData = [
    {
      year: "2017",
      태양광: 7739189,
      풍력: 2169112,
      수력: 2819882,
      해양: 489466,
      바이오: 7466664,
      재생폐기물: 330048,
      연료전지: 1468919,
    },
    {
      year: "2018",
      태양광: 10167519,
      풍력: 2464974,
      수력: 3374375,
      해양: 485353,
      바이오: 9363229,
      재생폐기물: 347166,
      연료전지: 1775115,
    },
    {
      year: "2019",
      태양광: 14192911,
      풍력: 2679248,
      수력: 2791076,
      해양: 474321,
      바이오: 10415632,
      재생폐기물: 356149,
      연료전지: 2306654,
    },
    {
      year: "2020",
      태양광: 19337964,
      풍력: 3149948,
      수력: 3879383,
      해양: 457263,
      바이오: 9938354,
      재생폐기물: 439137,
      연료전지: 3544354,
    },
    {
      year: "2021",
      태양광: 24717623,
      풍력: 3180017,
      수력: 3057210,
      해양: 454980,
      바이오: 11788068,
      재생폐기물: 470620,
      연료전지: 4798120,
    },
    {
      year: "2022",
      태양광: 30726260,
      풍력: 3369458,
      수력: 3544866,
      해양: 423843,
      바이오: 11927592,
      재생폐기물: 413529,
      연료전지: 5409625,
    },
  ];
  const formatYAxis = (tickItem) => {
    // Convert MWh to GWh
    return `${(tickItem / 1000000).toFixed(1)} GWh`;
  };
  const formatTooltip = (value, name) => {
    const formattedValue = new Intl.NumberFormat("en-US").format(value);
    return `${formattedValue} Mwh`;
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
          <h3>전국 태양광 발전소</h3>
          <p>159,813개소</p>
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
        </motion.div>
        <div className="plant-map">
          <SimpleSouthKoreaMapChart
            setColorByCount={setColorByCount}
            data={mapData}
          />
        </div>
        <div>
          <ResponsiveContainer width="90%" height={300}>
            <BarChart
              data={powerData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="none" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip
                formatter={formatTooltip}
                cursor={false}
                contentStyle={{
                  fontWeight: 700,
                  color: "#333",
                  borderRadius: "20px",
                }}
              />
              <Legend />
              <Bar dataKey="풍력" stackId="a" fill="#c7d9b2" />
              <Bar dataKey="수력" stackId="a" fill="#a5c1d1" />
              <Bar dataKey="해양" stackId="a" fill="#a9d4c8" />
              <Bar dataKey="바이오" stackId="a" fill="#c8bae0" />
              <Bar dataKey="재생폐기물" stackId="a" fill="#9a94a6" />
              <Bar dataKey="연료전지" stackId="a" fill="#957e96" />
              <Bar dataKey="태양광" stackId="a" fill="#e8b9a2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
export default SolarPowerPlantMap;
