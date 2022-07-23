import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

export default function GridBox({ box_content }) {
  const { box_name, box_number, box_icon, icon_color, note } = box_content;
  return (
    <>
      <div id="box_wrapper">
        <div className="box_content">
          <div>
            <span id="chart_indicator_label">{box_name}</span>
          </div>
          <div>
            <VisibilitySensor partialVisibility>
              {({ isVisible }) => (
                <h1 id="amount_label" style={{ height: "43px" }}>
                  {isVisible ? (
                    <CountUp
                      start={0}
                      end={box_number}
                      duration={3}
                      separator=","
                    />
                  ) : null}
                </h1>
              )}
            </VisibilitySensor>
          </div>
          {note && (
            <p className="mt-2 text-thin text-black3 tracking-wider">{note}</p>
          )}
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
