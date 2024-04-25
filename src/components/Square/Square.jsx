import React from "react";
import "./SquareStyle.css";

export default function Square({ children, handleGame, index }) {
  let className;
  children == null ? (className = "emptyCell") : (className = "cell");
  return (
    <div className={className} onClick={() => handleGame(index)}>
      {children}
    </div>
  );
}
