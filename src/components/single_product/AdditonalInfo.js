import { useState } from "react";

export default function AdditonalInfo({ additionalInfo }) {
  const { description, weight, tags } = additionalInfo;
  const [tab, setTab] = useState("description");

  return (
    <>
      <div className="additional_info_wrapper">
        <div className="flex justify-start items-center pb-3">
          <div>
            <button
              onClick={() => setTab("description")}
              id={tab === "description" ? "cart_btn" : "tab_btn"}
              className="!rounded-sm !text-light !capitalize"
            >
              description
            </button>
          </div>
          &nbsp;
          <div>
            <button
              onClick={() => setTab("additional")}
              id={tab === "additional" ? "cart_btn" : "tab_btn"}
              className="!rounded-sm !text-light !capitalize"
            >
              Additonal info
            </button>
          </div>
          &nbsp;
          <div>
            <button
              onClick={() => setTab("review")}
              id={tab === "review" ? "cart_btn" : "tab_btn"}
              className="!rounded-sm !text-light !capitalize"
            >
              Review
            </button>
          </div>
        </div>
        {tab === "description" && (
          <div className="additional_info_content_wrapper">
            <h3 className="text-semi_medium font-medium tracking-wider text-black2 mb-10">
              Description
            </h3>
            <p>{description}</p>
          </div>
        )}

        {tab === "additional" && (
          <div className="additional_info_content_wrapper">
            <h3 className="text-semi_medium font-medium tracking-wider text-black2 mb-10">
              Additonal Information
            </h3>
            <div className="grid grid-cols-2 border border-slate-300">
              <div className="border-r-1 border-slate-300 h-15 px-1 flex items-center">
                Weight
              </div>
              <div className="h-15 px-1 flex items-center">{weight}</div>
            </div>
          </div>
        )}

        {tab === "review" && (
          <div className="additional_info_content_wrapper">
            <h3 className="text-semi_medium font-medium tracking-wider text-black2 mb-10">
              Reviews and Rattings
            </h3>
            <p>This is review upcoming....!</p>
          </div>
        )}
      </div>
    </>
  );
}
