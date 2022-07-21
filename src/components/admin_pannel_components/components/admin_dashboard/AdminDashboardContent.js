import React from "react";
import LineChartFancy from "../../../../utilities/GraphChart/Rechart/LineChart/LineChartFancy";

export default function AdminDashboardContent() {
  // chart configuration here
  const labels_array = [
    { label: "order done", bg_color: "#8884d8" },
    { label: "order cancel", bg_color: "#82ca9d" },
    { label: "sells profit", bg_color: "#ffc658" },
  ];
  const data = [
    {
      name: "Jan",
      od: 400,
      oc: 2400,
      sp: 2400,
    },
    {
      name: "Jan",
      od: 4000,
      oc: 2400,
      sp: 2400,
    },
    {
      name: "Jan",
      od: 4000,
      oc: 2400,
      sp: 2400,
    },
    {
      name: "Feb",
      od: 3000,
      oc: 1398,
      sp: 2210,
    },
    {
      name: "Mar",
      od: 2000,
      oc: 9800,
      sp: 2290,
    },
    {
      name: "Apr",
      od: 2780,
      oc: 3908,
      sp: 2000,
    },
    {
      name: "May",
      od: 1890,
      oc: 4800,
      sp: 2181,
    },
    {
      name: "Jun",
      od: 2390,
      oc: 3800,
      sp: 2500,
    },
    {
      name: "Jul",
      od: 3490,
      oc: 4300,
      sp: 2100,
    },
    {
      name: "Jul",
      od: 3490,
      oc: 4300,
      sp: 2100,
    },
    {
      name: "Jul",
      od: 3490,
      oc: 4300,
      sp: 2100,
    },
    {
      name: "Jul",
      od: 3490,
      oc: 4300,
      sp: 2100,
    },
    {
      name: "Jul",
      od: 5490,
      oc: 5300,
      sp: 5100,
    },
  ];
  return (
    <>
      <div className="lg:!flex xs:grid items-center">
        <div className="lg:!w-3/4 xs:w-full xs:mb-15 lg:!mb-0 bg-white mx-auto rounded-md py-1.5 shadow-md lg:mr-5">
          <LineChartFancy
            chart_name="sales analytics"
            labels_array={labels_array}
            chart_data={data}
          />
        </div>
        <div className="lg:!w-1/4 xs:w-full">third one</div>
      </div>
    </>
  );
}
