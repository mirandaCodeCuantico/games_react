import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Player-Form/player_form.css';

function PlayerForm() {
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (playerName.trim() === "") {
      setError("Por favor, ingresa tu nombre.");
      return;
    }

    localStorage.setItem("playerName", playerName.trim());

    navigate("/home");
  };

  return (
    <div className="form-container">
      <div className="stars"></div>
      <form className="player-form" onSubmit={handleSubmit}>
        <h2>Registro de Jugador</h2>
        <input
          type="text"
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value);
            if (error) setError("");
          }}
          placeholder="Nombre del jugador"
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default PlayerForm;