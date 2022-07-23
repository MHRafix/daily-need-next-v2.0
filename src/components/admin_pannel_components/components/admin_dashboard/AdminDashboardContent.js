import React, { useState } from "react";
import { FaCoins, FaUsers } from "react-icons/fa";
import { MdAddShoppingCart, MdShoppingBasket } from "react-icons/md";
import LineChartFancy from "../../../../utilities/GraphChart/Rechart/LineChart/LineChartFancy";
import DashboardUsersMiniTable from "../../../../utilities/React_Table/UsersDataTable/DashboardUsersMiniTable";
import GridBox from "../../admin_pannel_utilities/GridBoxes/GridBox";

export default function AdminDashboardContent({
  all_orders,
  all_users,
  all_products,
}) {
  // calculate total sells here
  let total_sells = 0;
  for (const order of all_orders) {
    total_sells = total_sells + order?.order_overview?.total_amount;
  }

  // summury data state here
  const [users, setUsers] = useState(all_orders?.length);
  const [orders, setOrders] = useState(all_orders?.length);
  const [profit, setProfit] = useState((total_sells / 100) * 25);

  // summury box content
  const summury_content = [
    {
      _id: 1,
      box_name: "total users",
      box_number: users,
      box_icon: <FaUsers />,
      icon_color: "#6c5ffc",
    },
    {
      _id: 2,
      box_name: "total orders",
      box_number: orders,
      box_icon: <MdAddShoppingCart />,
      icon_color: "#ff269e",
    },
    {
      _id: 3,
      box_name: "total sells",
      box_number: total_sells,
      box_icon: <MdShoppingBasket />,
      icon_color: "#ffc658",
    },
    {
      _id: 4,
      box_name: "total profit",
      box_number: profit,
      box_icon: <FaCoins />,
      icon_color: "#2bd891",
    },
  ];

  // chart configuration here
  const labels_array = [
    { _id: 1, label: "order done", bg_color: "#6c5ffc" },
    { _id: 2, label: "order cancel", bg_color: "#2bd891" },
    { _id: 3, label: "sells profit", bg_color: "#ffc658" },
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
      {/* summury boxes */}
      <div className="my-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {summury_content.map((box) => (
          <GridBox key={box._id} box_content={box} />
        ))}
      </div>
      <div className="lg:!flex xs:grid">
        {/* sells analytics chart */}
        <div className="lg:!w-2/3 xs:w-full xs:mb-15 lg:!mb-0 mx-auto rounded-md shadow-lg lg:mr-5">
          <LineChartFancy
            item_name="sales analytics"
            labels_array={labels_array}
            chart_data={data}
          />
        </div>
        <div className="lg:!w-1/3 xs:w-full">
          <DashboardUsersMiniTable
            item_name="users table"
            users_data={all_users}
          />
        </div>
      </div>
    </>
  );
}
