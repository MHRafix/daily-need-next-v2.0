import React from "react";
import DashboardContentLayout from "../../../../components/admin_pannel_components/admin_pannel_utilities/DashboardLayout/DashboardContentLayout";

export default function ChartLayout({ item_name, labels_array, children }) {
  return (
    <DashboardContentLayout item_name={item_name}>
      <div
        id="chart_indicators_wrapper"
        style={{ margin: "auto", textAlign: "center" }}
      >
        {labels_array.map((chart) => (
          <span id="chart_indicator">
            <span
              style={{
                width: "15px",
                height: "15px",
                display: "block",
                borderRadius: "100px",
                background: `${chart.bg_color}`,
              }}
            ></span>
            &nbsp;&nbsp;
            <span id="chart_indicator_label">{chart.label}</span>
          </span>
        ))}
      </div>
      <div id="chart_area">{children}</div>
    </DashboardContentLayout>
  );
}
