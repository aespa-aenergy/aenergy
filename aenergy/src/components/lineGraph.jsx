import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const data = [
  { name: "1월", pv: 2400 },
  { name: "2월", pv: 1398 },
  { name: "3월", pv: 9800 },
  { name: "4월", pv: 3908 },
  { name: "5월", pv: 4800 },
  { name: "6월", pv: 3800 },
  { name: "7월", pv: 4300 },
  { name: "8월", pv: 3200 },
  { name: "9월", pv: 2800 },
  { name: "10월", pv: 5000 },
  { name: "11월", pv: 4300 },
  { name: "12월", pv: 2100 },
];

function LineGraph({ year, view }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
