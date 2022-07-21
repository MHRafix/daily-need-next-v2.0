import React from "react";
import { FaCoins, FaUsers } from "react-icons/fa";
import { MdAddShoppingCart, MdShoppingBasket } from "react-icons/md";
import GridBox from "../../../../utilities/admin_dashboard_utilities/GridBoxes/GridBox";
import LineChartFancy from "../../../../utilities/GraphChart/Rechart/LineChart/LineChartFancy";

export default function AdminDashboardContent() {
  // summury box content
  const summury_content = [
    {
      _id: 1,
      box_name: "total users",
      box_number: 45748,
      box_icon: <FaUsers />,
      icon_color: "#6c5ffc",
    },
    {
      _id: 2,
      box_name: "total orders",
      box_number: 852454,
      box_icon: <MdAddShoppingCart />,
      icon_color: "#ff269e",
    },
    {
      _id: 3,
      box_name: "total sells",
      box_number: 13215,
      box_icon: <MdShoppingBasket />,
      icon_color: "#ffc658",
    },
    {
      _id: 4,
      box_name: "total profit",
      box_number: 24154,
      box_icon: <FaCoins />,
      icon_color: "#2bd891",
    },
  ];

  // chart configuration here
  const labels_array = [
    { label: "order done", bg_color: "#6c5ffc" },
    { label: "order cancel", bg_color: "#2bd891" },
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
      <div className="my-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {summury_content.map((box) => (
          <GridBox key={box._id} box_content={box} />
        ))}
      </div>
      <div className="lg:!flex xs:grid items-center">
        <div className="lg:!w-2/3 xs:w-full xs:mb-15 lg:!mb-0 bg-white mx-auto rounded-md py-1.5 shadow-md lg:mr-5">
          <LineChartFancy
            chart_name="sales analytics"
            labels_array={labels_array}
            chart_data={data}
          />
        </div>
        <div className="lg:!w-1/3 xs:w-full">third one</div>
      </div>
    </>
  );
}
