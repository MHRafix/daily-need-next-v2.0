import CardData from "../../../utilities/CardData";
import DataChart from "../../../utilities/GraphChart/DataChart";
import ProfileContentLayout from "../../../utilities/ProfileContentLayout";
import { card_fake_data } from "../../../utilities/React_Table/DataTables.js/table_data";

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

  //data for bar chart
  const data = {
    labels: purchased_date,
    label: "Purchased Chart",
    datasets: [
      {
        label: "# My First Dataset",
        data: purchased_bdt,
        fill: true,
        backroundColor: "red!",
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointBorderColor: "green",
        pointBackgroundColor: "green",
      },
    ],
  };
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
              <h1 id="amount_label">৳ {total_purchased}</h1>
              <span id="hstory_name">current purchased</span>
            </div>
            <div id="purchase_history_amount">
              <h1 id="amount_label">৳ {inprogress_amount}</h1>
              <span id="hstory_name">inprogress purchased</span>
            </div>
            <div id="purchase_history_amount" style={{ borderRight: "none" }}>
              <h1 id="amount_label">৳ {canceled_amount}</h1>
              <span id="hstory_name">canceled purchased</span>
            </div>
          </div>
          {/* topbar purchase summary end here */}
          <div className="purchased_chart_and_payment_table_wrapper">
            <div className="purchased_chart_wrapper">
              <h1 className="dashboard_content_title">{data.label}</h1>

              <DataChart type="line" data={data} />
            </div>
            <div className="purchased_data_table_wrapper">
              <h1 className="dashboard_content_title">Payment Card</h1>
              <div id="card_data_table" className="overflow-y-scroll h-per_86">
                {card_fake_data.map((card) => (
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
