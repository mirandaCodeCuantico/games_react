import { useEffect, useState } from "react";
import { getTopScores } from "../../helpers/storage";
import RankingTable from "../ranking/ranking_table";
import { useNavigate } from "react-router-dom";
import "../ranking/home_rankings.css"; // Asegúrate de importar tu CSS

export default function RankingPage() {
  const [cuadroRanking, setCuadroRanking] = useState([]);
  const [memoriaRanking, setMemoriaRanking] = useState([]);
  const [culebritaRanking, setCulebritaRanking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCuadroRanking(getTopScores("cuadro"));
    setMemoriaRanking(getTopScores("memoria"));
    setCulebritaRanking(getTopScores("culebrita"));
  }, []);

  return (
    <div className="ranking-container">
      <h1 className="ranking-title">🏆 Rankings de Juegos</h1>

      <div className="ranking-sections">
        <section className="ranking-card">
          <h2 className="ranking-header cuadro">🎯 Cuadro</h2>
          <RankingTable ranking={cuadroRanking} />
        </section>

        <section className="ranking-card">
          <h2 className="ranking-header memoria">🧠 Memoria</h2>
          <RankingTable ranking={memoriaRanking} />
        </section>

        <section className="ranking-card">
          <h2 className="ranking-header culebrita">🐍 Culebrita</h2>
          <RankingTable ranking={culebritaRanking} />
        </section>
      </div>

      <div className="ranking-footer">
        <button onClick={() => navigate("/home")} className="back-button">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}