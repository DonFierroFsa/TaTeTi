import React from "react";
import "./BtnReset.css";

export default function BtnReset({ fun, text }) {
  return (
    <>
      <button className='btnReset' onClick={fun}>
        {text}
      </button>
    </>
  );
}
