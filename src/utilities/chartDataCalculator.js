export const chartDataCalculator = (
  current_years_completed_orders,
  current_years_canceled_orders,
  month,
  month_name
) => {
  // make chart data object here
  const chart_obj = { name: "Jan", od: 0, oc: 0, sp: 0 };

  // push month name
  chart_obj.name = month_name[month - 1];

  const monthly_completed_orders = current_years_completed_orders.filter(
    (order) => order.order_overview.order_date.month === month
  );

  // calculate completed order's monthly sells here
  let monthly_sells = 0;
  monthly_completed_orders.map((order) => {
    monthly_sells = order.order_overview.total_amount + monthly_sells;

    chart_obj.od = monthly_sells;
    chart_obj.sp = (monthly_sells / 100) * 25;
  });

  // calculate canceled order's monthly sells here
  const monthly_canceled_orders = current_years_canceled_orders.filter(
    (order) => order.order_overview.order_date.month === month
  );

  let monthly_canceled_sells = 0;
  monthly_canceled_orders.map((order) => {
    monthly_canceled_sells =
      order.order_overview.total_amount + monthly_canceled_sells;

    chart_obj.oc = monthly_canceled_sells;
    // chart_data.push(chart_obj);
  });
  return chart_obj;
};
