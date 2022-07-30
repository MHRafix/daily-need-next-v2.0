import CardData from "../../../utilities/CardData";
import { userPurchasedChartCalculator } from "../../../utilities/chartDataCalculator";
import LineChartFancy from "../../../utilities/GraphChart/Rechart/LineChart/LineChartFancy";
import ProfileContentLayout from "../../../utilities/ProfileContentLayout";

export default function ProfileDashboardContent({ my_orders }) {
  // purchased amount summury
  const purchased_bdt = [];

  my_orders.map((order) =>
    purchased_bdt.push(order?.order_overview?.total_amount)
  );

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

  // purchased date summury
  const purchased_date = [];

  my_orders.map((order) => {
    const chart_label = `${
      month_name[order?.order_overview?.order_date?.month]
    } - ${order?.order_overview?.order_date?.date}`;
    purchased_date.push(chart_label);
  });

  // total purchased amount calculate here
  let total_purchased = 0;

  for (const bdt of purchased_bdt) {
    total_purchased = total_purchased + bdt;
  }

  // completed purchased amount calculate here
  let completed_amount = 0;

  // filter out completed orders
  const completed_orders = my_orders.filter(
    (order) => order?.order_overview?.order_status === "completed"
  );

  // calculate here
  completed_orders.map(
    (order) =>
      (completed_amount =
        completed_amount + order?.order_overview?.total_amount)
  );

  // in-progress purchased amount calculate here
  let inprogress_amount = 0;

  // filter out inprogress orders
  const inprogress_orders = my_orders.filter(
    (order) => order?.order_overview?.order_status === "inprogress"
  );

  // calculate here
  inprogress_orders.map(
    (order) =>
      (inprogress_amount =
        inprogress_amount + order?.order_overview?.total_amount)
  );

  // canceled orders purchased amount calculate here
  let canceled_amount = 0;

  // filter out inprogress orders
  const canceled_orders = my_orders.filter(
    (order) => order?.order_overview?.order_status === "canceled"
  );

  // calculate here
  canceled_orders.map(
    (order) =>
      (canceled_amount = canceled_amount + order?.order_overview?.total_amount)
  );

  // make payment card data
  const card_data = [];

  my_orders.map((card_info) => {
    const order_date = `${card_info?.order_overview?.order_date?.date} / ${card_info?.order_overview?.order_date?.month} / ${card_info?.order_overview?.order_date?.year}`;

    card_data.push({
      card_name: card_info?.payment_info?.card_name,
      payment_amount: card_info?.order_overview?.total_amount,
      payment_date: order_date,
    });
  });

  // chart data here
  const current_year = new Date().getFullYear();
  const month_num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const data = [];

  //data for bar chart
  for (const month of month_num) {
    const chart_obj = userPurchasedChartCalculator(
      my_orders,
      month,
      month_name
    );

    data.push(chart_obj);
  }

  // chart configuration here
  const labels_array = [{ _id: 1, label: "my orders", bg_color: "#2bd891" }];

  return (
    <>
      <ProfileContentLayout content_title="profile dashboard">
        <div id="dashboard_home_wrapper">
          {/* topbar purchase summary start here */}
          <div id="topbar_purchase_summary">
            <div
              id="purchase_history_amount"
              // style={{ border: "1px solid #0cc5b7" }}
            >
              <h1 id="amount_label">৳ {total_purchased.toFixed(2)}</h1>
              <span id="hstory_name">total purchased</span>
            </div>
            <div id="purchase_history_amount">
              <h1 id="amount_label">৳ {completed_amount.toFixed(2)}</h1>
              <span id="hstory_name">completed purchased</span>
            </div>
            <div id="purchase_history_amount">
              <h1 id="amount_label">৳ {inprogress_amount.toFixed(2)}</h1>
              <span id="hstory_name">inprogress purchased</span>
            </div>
            <div id="purchase_history_amount" style={{ borderRight: "none" }}>
              <h1 id="amount_label">৳ {canceled_amount.toFixed(2)}</h1>
              <span id="hstory_name">canceled purchased</span>
            </div>
          </div>
          {/* topbar purchase summary end here */}
          <div className="purchased_chart_and_payment_table_wrapper">
            <div className="purchased_chart_wrapper">
              <h1 className="dashboard_content_title">{data.label}</h1>

              <LineChartFancy
                item_name="purchased chart"
                labels_array={labels_array}
                chart_data={data}
              />
            </div>
            <div className="purchased_data_table_wrapper">
              <h1 className="dashboard_content_title">Payment Card</h1>
              <div id="card_data_table" className="overflow-y-scroll h-per_86">
                {card_data.map((card) => (
                  <CardData key={card._id} card_data={card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProfileContentLayout>
    </>
  );
}
