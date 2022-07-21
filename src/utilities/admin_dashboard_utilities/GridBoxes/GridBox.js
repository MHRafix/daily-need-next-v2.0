import React from "react";

export default function GridBox({ box_content }) {
  const { box_name, box_number, box_icon, icon_color } = box_content;
  return (
    <>
      <div id="box_wrapper">
        <div className="box_content">
          <div>
            <span id="chart_indicator_label">{box_name}</span>
          </div>
          <div>
            <h1 id="amount_label">{box_number}</h1>
          </div>
        </div>
        <div
          className="box_icon"
          style={{ fontSize: "50px", color: `${icon_color}` }}
        >
          {box_icon}
        </div>
      </div>
    </>
  );
}
