import React, { useState } from "react";
import { FaCoins, FaUsers } from "react-icons/fa";
import { MdAddShoppingCart, MdShoppingBasket } from "react-icons/md";
import { chartDataCalculator } from "../../../../utilities/chartDataCalculator";
import LineChartFancy from "../../../../utilities/GraphChart/Rechart/LineChart/LineChartFancy";
import ReactPaginationTable from "../../../../utilities/React_Table/PaginationTable/ReactPaginationTable";
import DashboardUsersMiniTable from "../../../../utilities/React_Table/UsersDataTable/DashboardUsersMiniTable";
import DashboardContentLayout from "../../admin_pannel_utilities/DashboardLayout/DashboardContentLayout";
import GridBox from "../../admin_pannel_utilities/GridBoxes/GridBox";

export default function AdminDashboardContent({
  all_orders,
  all_users,
  all_products,
}) {
  // calculate total sells and profit here
  let total_sells = 0;

  all_orders.filter((order) => {
    if (order.order_overview.order_status !== "canceled") {
      total_sells = total_sells + order?.order_overview?.total_amount;
    }
  });

  // completed orders
  const completed_orders = all_orders.filter(
    (order) => order.order_overview.order_status !== "canceled"
  );

  // calculate canceled orders
  const canceled_orders = all_orders.filter(
    (order) => order.order_overview.order_status == "canceled"
  );

  // summury data state here
  const [users, setUsers] = useState(all_users?.length);
  const [orders, setOrders] = useState(completed_orders?.length);
  const [profit, setProfit] = useState((total_sells / 100) * 25);

  // summury box content
  const summury_content = [
    {
      _id: 1,
      box_name: "total users",
      box_number: users,
      box_icon: <FaUsers />,
      icon_color: "#6c5ffc",
      note: "Admin, user & vendor",
    },
    {
      _id: 2,
      box_name: "total orders",
      box_number: orders,
      box_icon: <MdAddShoppingCart />,
      icon_color: "#ff269e",
      note: "Without canceled",
    },
    {
      _id: 3,
      box_name: "total sells",
      box_number: total_sells,
      box_icon: <MdShoppingBasket />,
      icon_color: "#ffc658",
      note: "Without canceled",
    },
    {
      _id: 4,
      box_name: "total profit",
      box_number: profit,
      box_icon: <FaCoins />,
      icon_color: "#2bd891",
      note: "25% of sells",
    },
  ];

  // chart configuration here
  const labels_array = [
    { _id: 1, label: "order done", bg_color: "#6c5ffc" },
    { _id: 2, label: "order cancel", bg_color: "#2bd891" },
    { _id: 3, label: "sells profit", bg_color: "#ffc658" },
  ];

  const data = [
    // { name: "Jan", od: 0, sp: 371.5225, oc: 0 },
    // { name: "Feb", od: 0, sp: 371.5225, oc: 0 },
    // { name: "Mar", od: 0, sp: 371.5225, oc: 0 },
    // { name: "Apr", od: 0, sp: 371.5225, oc: 0 },
    // { name: "May", od: 0, sp: 371.5225, oc: 0 },
    // { name: "Jun", od: 0, sp: 371.5225, oc: 0 },
    // { name: "Jul", od: 0, sp: 371.5225, oc: 0 },
    // { name: "Jul", od: 120, sp: 371.5225, oc: 0 },
    // { name: "Aug", od: 0, sp: 371.5225, oc: 0 },
    // { name: "Sep", od: 0, sp: 371.5225, oc: 0 },
    // { name: "Oct", od: 0, sp: 371.5225, oc: 0 },
    // { name: "Nov", od: 0, sp: 371.5225, oc: 0 },
    // { name: "Dec", od: 0, sp: 371.5225, oc: 0 },
  ];

  const current_year = new Date().getFullYear();
  const month_num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const month_name = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // filter out current year's canceled orders
  const current_years_canceled_orders = canceled_orders.filter(
    (order) => order.order_overview.order_date.year === current_year
  );

  // current year's completed orders
  const current_years_completed_orders = completed_orders.filter(
    (order) => order.order_overview.order_date.year === current_year
  );

  for (const month of month_num) {
    const chart_obj = chartDataCalculator(
      current_years_completed_orders,
      current_years_canceled_orders,
      month,
      month_name
    );

    data.push(chart_obj);
  }

  return (
    <>
      {/* summury boxes */}
      <div className="dashboard_row_wrapper">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {summury_content.map((box) => (
            <GridBox key={box._id} box_content={box} />
          ))}
        </div>
      </div>
      {/* chart and users table */}
      <div className="dashboard_row_wrapper">
        <div className="lg:!flex xs:grid">
          {/* sells analytics chart */}
          <div className="lg:!w-2/3 xs:w-full xs:mb-15 lg:!mb-0 mx-auto rounded-md shadow-lg lg:mr-5">
            <LineChartFancy
              item_name="sales analytics"
              labels_array={labels_array}
              chart_data={data}
            />
          </div>
          {/* users mini table */}
          <div className="lg:!w-1/3 xs:w-full">
            <DashboardUsersMiniTable
              item_name="users table"
              users_data={all_users}
            />
          </div>
        </div>
      </div>

      {/* products show on table */}
      <div className="dashboard_row_wrapper">
        <div className="manage_products_table">
          <DashboardContentLayout item_name="all products">
            <ReactPaginationTable PRODUCTS_DATA={all_products} />
          </DashboardContentLayout>
        </div>
      </div>
    </>
  );
}
