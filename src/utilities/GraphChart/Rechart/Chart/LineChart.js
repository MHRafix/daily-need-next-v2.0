import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function LineChart({ chart_data }) {
  // console.log(chart_data);
  return (
    <>
      <ResponsiveContainer>
        <AreaChart
          data={chart_data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeOpacity={0.3} /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="od" stroke="#6c5ffc" fill="#6c5ffc" />
          <Area type="monotone" dataKey="oc" stroke="#ffc658" fill="#ffc658" />
          <Area type="monotone" dataKey="sp" stroke="#2bd891" fill="#2bd891" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
