import { Link } from "react-router-dom";
import "../styles/home.css";

function PlanetButton({ route, text, planetColor, delay, radius }) {
  const orbitStyle = {
    animationDelay: delay,
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
  };

  const buttonStyle = {
    backgroundColor: planetColor,
    transform: `translateX(${radius}px)`, // posiciona el planeta sobre la órbita
  };

  return (
    <div className="orbit" style={orbitStyle}>
      <Link to={route} className="planet-button" style={buttonStyle}>
        {text}
      </Link>
    </div>
  );
}

export default PlanetButton;