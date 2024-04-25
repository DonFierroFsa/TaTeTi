import React from "react";
import "./WinnerModal.css";
import BtnReset from "../BtnReset/BtnReset";
export default function WinnerModal({ winner, resetGame }) {
  const handleModal = (e) => {
    if (e.target.id == "modalContainer") {
      resetGame();
    }
  };
  return (
    <div onClick={handleModal} id='modalContainer'>
      <div className='modal'>
        <h2>Juego Terminado </h2>
        {winner == "Fue un Empate" ? (
          <div className='turn'>
            <h2>{winner}</h2>
          </div>
        ) : (
          <div className='turn'>
            <h2>El ganador es</h2>
            <img src={winner} alt={winner} />
          </div>
        )}
        <BtnReset text='LIMPIAR' fun={resetGame} />
      </div>
    </div>
  );
}
