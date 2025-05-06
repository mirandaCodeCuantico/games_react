import { useEffect, useState } from "react";
import { saveScore } from "../../helpers/storage";
import "../Memory-Game/memory_game.css";

const themes = [
    'images/reverso_.jpeg',
    'images/reveso.jpeg'
]

const images = [
    'images/batman.webp',
    'images/batmanquerie.webp',
    'images/bmo.jpg',
    'images/fin.webp',
    'images/golb.jpg',
    'images/jake.jpg',
    'images/manhatan.jpg',
    'images/moonknight.jpg',
    'images/rorschach.jpg',
    'images/spiderpunk.jpg'
];

export default function MemoryGame() {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // Tiempo del juego en segundos
    const [gameOver, setGameOver] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("selectedTheme") || themes[0]); // Tema de las cartas
  
    // Barajar las cartas y asignar imágenes a las cartas
    const shuffleCards = () => {
      let shuffledCards = [...images, ...images]; // Duplicar las imágenes
      shuffledCards = shuffledCards.map((img, index) => ({
        id: index,
        image: img,
        isFlipped: false,
        isMatched: false,
      }));
      shuffledCards = shuffledCards.sort(() => Math.random() - 0.5); // Barajar
      setCards(shuffledCards);
    };
  
    useEffect(() => {
      if (timeLeft === 0) {
        setGameOver(true);
        const playerName = localStorage.getItem("playerName") || "Invitado";
        saveScore("memoria", playerName, attempts, score); // Guardamos intentos y puntuación
        return;
      }
  
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }, [attempts, score, timeLeft]);
  
    useEffect(() => {
      shuffleCards(); // Barajar las cartas al iniciar el juego
    }, []);
  
    const handleCardClick = (card) => {
      if (flippedCards.length === 2 || card.isFlipped || gameOver) return;
  
      const updatedCards = [...cards];
      const index = updatedCards.findIndex(c => c.id === card.id);
      updatedCards[index].isFlipped = true;
      setFlippedCards([...flippedCards, card]);
      setCards(updatedCards);
  
      if (flippedCards.length === 1) {
        const [firstCard] = flippedCards;
        if (firstCard.image === card.image) {
          // Emparejamos las cartas
          const matched = [...matchedCards, firstCard, card];
          setMatchedCards(matched);
          setScore(score + 1); // Aumentamos el puntaje
          setFlippedCards([]); // Limpiamos las cartas volteadas
        } else {
          setAttempts(attempts + 1); // Aumentamos los intentos
          setTimeout(() => {
            // Volvemos a poner las cartas boca abajo después de 1 segundo
            const resetCards = [...cards];
            resetCards[index].isFlipped = false;
            const firstIndex = updatedCards.findIndex(c => c.id === firstCard.id);
            resetCards[firstIndex].isFlipped = false;
            setCards(resetCards);
            setFlippedCards([]);
          }, 1000);
        }
      }
    };
  
    const handleThemeChange = (newTheme) => {
      setTheme(newTheme);
      localStorage.setItem("selectedTheme", newTheme);
      shuffleCards();
    };
  
    return (
      <div className="memory-game">
        <div className="game-ui">
          <p className="score">Puntaje: {score}</p>
          <p className="attempts">Intentos: {attempts}</p>
          <p className="timer">Tiempo restante: {timeLeft}s</p>
        </div>
  
        <div className="theme-selector">
          <h3>Seleccionar Tema:</h3>
          {themes.map((t, index) => (
            <button key={index} onClick={() => handleThemeChange(t)}>
              Tema {index + 1}
            </button>
          ))}
        </div>
  
        <div className="cards-container">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card ${card.isFlipped || card.isMatched ? "flipped" : ""}`}
              onClick={() => handleCardClick(card)}
              style={{
                backgroundImage: `url(${card.isFlipped || card.isMatched ? card.image : theme})`,
              }}
            ></div>
          ))}
        </div>
  
        {gameOver && (
          <div className="end-screen">
            <h2>Juego Terminado</h2>
            <p>Tu puntuación: {score}</p>
            <p>Intentos: {attempts}</p>
            <a href="/home" className="back-button">Volver al Home</a>
          </div>
        )}
      </div>
    );
  }