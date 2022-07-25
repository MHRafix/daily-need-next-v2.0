import React from "react";

export default function ReactModal({ setModal, modal_title, children }) {
  return (
    <>
      <div className="modalBackground1">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <div>{modal_title}</div>
            <button
              onClick={() => {
                setModal(false);
              }}
            >
              ✖
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
