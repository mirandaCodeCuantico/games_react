import { useEffect, useRef, useState } from "react";
import { saveScore } from "../../helpers/storage";
import "../Cuadro-Game/cuadro_game.css";

export default function CuadroGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Tiempo del juego en segundos
  const [imagePosition, setImagePosition] = useState({ top: 0, left: 0 });
  const [gameOver, setGameOver] = useState(false);
  const gameAreaRef = useRef(null);
  const selectedImage = localStorage.getItem("selectedImage") || "images/bmo.jpg";

  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
      const playerName = localStorage.getItem("playerName");
      saveScore("cuadro", playerName, score);
      return;
    }

    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [score, timeLeft]);

  useEffect(() => {
    if (!gameOver) {
      const moveImage = () => {
        const area = gameAreaRef.current.getBoundingClientRect();
        const size = 100;
        const maxTop = area.height - size;
        const maxLeft = area.width - size;
        setImagePosition({
          top: Math.random() * maxTop,
          left: Math.random() * maxLeft,
        });
      };

      const interval = setInterval(moveImage, 800);
      moveImage();
      return () => clearInterval(interval);
    }
  }, [gameOver]);

  const handleClick = () => setScore(score + 1);

  return (
    <div className="nebula-container" ref={gameAreaRef}>
      <div className="stars"></div>
      <div className="game-ui">
        <p className="score">Puntos: {score}</p>
        <p className="timer">Tiempo restante: {timeLeft}s</p>
      </div>
      {!gameOver ? (
        <img
          src={selectedImage}
          alt="jugable"
          onClick={handleClick}
          className="game-image"
          style={{ top: imagePosition.top, left: imagePosition.left }}
        />
      ) : (
        <div className="end-screen">
          <h2>Juego Terminado</h2>
          <p>Tu puntuación: {score}</p>
          <a href="/home" className="back-button">Volver al Home</a>
        </div>
      )}
    </div>
  );
}
