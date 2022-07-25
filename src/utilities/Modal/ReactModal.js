import React from "react";

export default function ReactModal({ setModal, modal_title, children }) {
  return (
    <>
      <div className="modalBackground1">
        <div id="modalContainer">
          <div className="titleCloseBtn">
            <div>{modal_title}</div>

            <button
              onClick={() => setModal(false)}
              className="cross_admin_pannel_navigation"
            >
              ✖
            </button>
          </div>
          <div id="modal_body">{children}</div>
        </div>
      </div>
    </>
  );
}
