import { useNavigate } from "react-router-dom";
import "../styles/exit_button.css";

function ExitButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("playerName");
    navigate("/"); 
  };

  return (
    <button className="exit-button" onClick={handleLogout}>
      Salir ✖
    </button>
  );
}

export default ExitButton;