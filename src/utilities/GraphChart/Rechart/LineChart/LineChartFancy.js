import React from "react";
import ChartLayout from "../Chart/ChartLayout";
import LineChart from "../Chart/LineChart";

export default function LineChartFancy({
  item_name,
  labels_array,
  chart_data,
}) {
  return (
    <>
      <ChartLayout item_name={item_name} labels_array={labels_array}>
        <LineChart chart_data={chart_data} />
      </ChartLayout>
    </>
  );
}
