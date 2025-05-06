import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayerForm from "../pages/Player-Form/player_form";
import Home from "../pages/Home/home";
import ImageSelector from "../pages/Cuadro-Game/image_selector";
import CuadroGame from "../pages/Cuadro-Game/cuadro_game";
import MemoriaGame from "../pages/Memory-Game/memory_game";
import RankingPage from "../pages/ranking/home_rankings"
import Snake from "../pages/Snake/snake";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<PlayerForm />}/>
        <Route path="/image_selector" element = {<ImageSelector />} />
        <Route path="/home" element = {<Home />} />
        <Route path="/cuadro_game" element = {<CuadroGame />} />
        <Route path="/memory_game" element = {<MemoriaGame />} />
        <Route path="/snake" element = {<Snake />} />
        <Route path="/home_rankings" element = {<RankingPage />} />
      </Routes>
    </BrowserRouter>
  );
}