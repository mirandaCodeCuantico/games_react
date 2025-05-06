import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExitButton from "./components/exit_button";
import PlanetButton from "./components/planet_button";
import "./styles/home.css";

function Home() {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("playerName");
    if (storedName) {
      setPlayerName(storedName);
    }
  },[]);
  return (
    <header className="nebula-container">
      <ExitButton />
      <h1 className="nebula-title">🌌Plataforma Juegos Galacticos🎮</h1>
      {playerName &&(
        <div className = "player-name">👨‍🚀Bienvenido, {playerName}</div>
      )}
      <div className="orbit-container">
        <div className="sun"></div>
        <PlanetButton 
          route = "/image_selector" 
          text = "Juego 1" 
          planetColor = "#e27d60" 
          delay = "0s" 
        />
        <PlanetButton 
          route = "/memory_game" 
          text = "Juego 2" 
          planetColor = "#ff9f00" 
          delay = "1s"
        />
        <PlanetButton 
          route = "/snake" 
          text = "Juego 3" 
          planetColor = "#38a1db" 
          delay = "2s"
        /> 
      </div>
      <div className="">
        <button
          className="ranking-button"
          onClick={() => navigate("/home_rankings")}
        >
          VER RANKING 🏆
        </button>
      </div>
    </header>
  );
}

export default Home;