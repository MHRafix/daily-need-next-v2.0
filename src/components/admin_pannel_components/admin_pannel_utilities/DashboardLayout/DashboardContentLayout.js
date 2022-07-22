import React from "react";

export default function DashboardContentLayout({ item_name, children }) {
  return (
    <>
      <div id="chart_layout_wrapper" className="bg-white py-1.5 rounded-md">
        <div id="chart_title_wrapper">
          <h1 id="chart_title">{item_name}</h1>
        </div>
        <div id="chart_area_wrapper">{children}</div>
      </div>
    </>
  );
}
