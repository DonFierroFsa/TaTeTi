import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import Square from "./components/Square/Square";
import { players, winnerCombos } from "./logic/constants";
import WinnerModal from "./components/WinnerModal/WinnerModal";
import BtnReset from "./components/BtnReset/BtnReset";

function App() {
  const initialBoard = Array(9).fill(null);

  //Load history in localStorage
  const boardSaved = () => {
    const boardSaved = JSON.parse(window.localStorage.getItem("board"));
    return boardSaved ? boardSaved : initialBoard;
  };
  const turnSaved = () => {
    const turnSaved = JSON.parse(window.localStorage.getItem("turns"));
    return turnSaved ?? players.x;
  };
  const historySaved = () => {
    const historySaved = JSON.parse(window.localStorage.getItem("history"));
    return historySaved ?? { board: initialBoard, turn: players.x };
  };
  //States
  const [board, setBoard] = useState(boardSaved);
  const [turn, setTurn] = useState(turnSaved);
  const [history, setHistory] = useState(historySaved);
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const tie = board.every((cell) => cell != null);
    if (tie) {
      setWinner("Fue un Empate");
    }
    for (const combo of winnerCombos) {
      const [a, b, c] = combo;

      if (board[a] && board[a] == board[b] && board[a] == board[c]) {
        setWinner(turn);
        confetti();
      }
    }
  };

  const handleGame = (index) => {
    //Prevent overwriting
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;

    let newTurn;
    turn === players.x ? (newTurn = players.o) : (newTurn = players.x);

    //Save the last move
    setHistory({ board: board, turn: turn });

    setTurn(newTurn);
    setBoard(newBoard);

    //Save game in localStorage
    window.localStorage.setItem(
      "history",
      JSON.stringify({ board: board, turn: turn })
    );
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turns", JSON.stringify(newTurn));

    checkWinner(newBoard);
  };

  const goBack = () => {
    const historySaved = JSON.parse(window.localStorage.getItem("history"));

    //Prevent loading of non-existent history
    if (historySaved) {
      setTurn(history.turn);
      setBoard(history.board);
      setWinner(null);
    }
  };

  const resetGame = () => {
    window.localStorage.clear();
    setWinner(null);
    setBoard(initialBoard);
    setHistory(initialBoard);
  };

  return (
    <main>
      <h1>TaTeTi</h1>
      <section>
        {winner && <WinnerModal winner={winner} resetGame={resetGame} />}
        {!winner && (
          <div>
            <h2>Turno de</h2>
            <h2>
              <strong className='turn'>
                <img src={turn} alt='xxx' />
              </strong>
            </h2>
          </div>
        )}
      </section>
      <section className='gameContainer'>
        <div className='game'>
          {board.map((cell, index) => {
            return (
              <Square key={index} index={index} handleGame={handleGame}>
                {cell && <img src={cell} alt='xx' />}
              </Square>
            );
          })}
        </div>
        <div className='btn-container'>
          <BtnReset fun={resetGame} text={"LIMPIAR"} />
          <BtnReset fun={goBack} text={"VOLVER"} />
        </div>
      </section>
    </main>
  );
}

export default App;
