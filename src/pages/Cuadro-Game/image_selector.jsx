import { useNavigate } from "react-router-dom";
import "../Cuadro-Game/image_selector.css"; 

const imagenes = [
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

export default function ImageSelector() {
  const navigate = useNavigate();

  const handleSelect = (img) => {
    localStorage.setItem("selectedImage", img);
    navigate("/cuadro_game");
  };

  return (
    <div className="selector-container">
      <div className="stars"></div>
      <h2>🌠 Selecciona tu imagen galáctica</h2>
      <div className="image-grid">
        {imagenes.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`img-${idx}`}
            className="image-option"
            onClick={() => handleSelect(img)}
          />
        ))}
      </div>
    </div>
  );
}