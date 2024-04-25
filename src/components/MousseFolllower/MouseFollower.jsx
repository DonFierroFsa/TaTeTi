import React, { useEffect, useState } from "react";
import "./MouseFollower.css";

export default function MouseFollower({ turn }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
    };
    const gameSquare = document.querySelector(".game");

    gameSquare.addEventListener("pointermove", handleMove);

    return () => {
      gameSquare.removeEventListener("pointermove", handleMove);
    };
  });
  return (
    <div
      style={{
        position: "absolute",
        width: "2rem",
        height: "2rem",
        top: "2rem",
        left: "-1rem",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: `translate(${position.x}px,${position.y}px)`,
      }}>
      <img src={turn} alt='' />
    </div>
  );
}
