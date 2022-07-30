import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function UserPurchasedChart({ chart_data }) {
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

          <Area
            type="monotone"
            dataKey="purchased"
            stackId="1"
            stroke="#28a745"
            fill="#28a745"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
