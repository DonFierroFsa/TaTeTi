import React, { useEffect, useState } from "react";
import "./MouseFollower.css";

//Sacar el style del div
//Animaciones de Salida

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
  }, [position]);
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        top: "-20px",
        left: "-20px",
        pointerEvents: "none",
        transform: `translate(${position.x}px,${position.y}px)`,
      }}>
      <img className='imgCursor' src={turn} alt='' />
    </div>
  );
}
