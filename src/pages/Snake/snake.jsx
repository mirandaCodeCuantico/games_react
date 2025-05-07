/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../Snake/snake.css";

export default function Snake() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [ranking, setRanking] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [resetTrigger, setResetTrigger] = useState(0);

  const username = localStorage.getItem("playerName") || "Invitado";
  const gameKey = "ranking-culebrita";

  const gridSize = 20;
  const tileCount = 20;

  const saveRanking = useCallback(() => {
    if (!username || score === 0) return;
    const newEntry = { name: username, score };
    const stored = JSON.parse(localStorage.getItem(gameKey)) || [];
    const updated = [...stored, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    localStorage.setItem(gameKey, JSON.stringify(updated));
    setRanking(updated);
  }, [username, score, ranking]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= tileCount ||
          head.y >= tileCount ||
          newSnake.some(seg => seg.x === head.x && seg.y === head.y)
        ) {
          if (attemptsLeft > 1) {
            setAttemptsLeft(prev => prev - 1);
            setGameOver(true);
          } else {
            saveRanking();
            setAttemptsLeft(0);
            setGameOver(true);
          }
          return prevSnake;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 1);
          setFood({
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);  

    return () => clearInterval(interval);
  }, [direction, food, gameOver, saveRanking, attemptsLeft, resetTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    ctx.fillStyle = "#2ecc71";
    snake.forEach(seg => {
      ctx.fillRect(seg.x * gridSize, seg.y * gridSize, gridSize, gridSize);
    });
  }, [snake, food]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(gameKey)) || [];
    setRanking(saved);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setFood({ x: 15, y: 15 });
    setScore(0);
    setGameOver(false);
    setResetTrigger(prev => prev + 1);
  };

  const exitToHome = () => {
    setAttemptsLeft(3);
    navigate("/home");
  };

  return (
    <div className="culebrita-container">
      <h2>🐍 Culebrita</h2>
      <p>Jugador: {username}</p>
      <p>Puntos: {score}</p>
      <canvas ref={canvasRef} width={400} height={400} />

      {gameOver && (
        <div className="game-over-controls visible">
          <p>🎮 Juego terminado</p>
          {attemptsLeft > 0 ? (
            <button onClick={restartGame} className="play-again-button visible">
              Jugar otra vez ({attemptsLeft} intento{attemptsLeft !== 1 && "s"})
            </button>
          ) : (
            <button onClick={exitToHome} className="exit-button">
              Volver al inicio
            </button>
          )}
        </div>
      )}
    </div>
  );
}
