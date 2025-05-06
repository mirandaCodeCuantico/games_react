import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "../src/routes/rutas";
//import PlayerForm from "./pages/Player-Form/player_form";
//import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);