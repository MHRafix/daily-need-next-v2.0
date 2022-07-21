import React from "react";

export default function ChartLayout({ chart_name, labels_array, children }) {
  return (
    <div id="chart_layout_wrapper">
      <div id="chart_title_wrapper">
        <h1 id="chart_title">{chart_name}</h1>
      </div>

      <div id="chart_area_wrapper">
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
      </div>
    </div>
  );
}
