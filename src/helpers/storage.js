const STORAGE_KEY = "gameScores";

// Guarda la puntuación de un jugador
export function saveScore(gameId, playerName, score) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; // Obtiene los datos existentes o crea un objeto vacío
  const gameScores = data[gameId] || []; // Si no existen, crea una lista vacía

  gameScores.push({ playerName, score }); // Agrega el nuevo puntaje
  gameScores.sort((a, b) => b.score - a.score); // Ordena los puntajes de mayor a menor
  data[gameId] = gameScores.slice(0, 5); // Solo guarda el Top 5

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); // Guarda en el localStorage
}

// Obtiene el ranking de un juego específico
export function getTopScores(gameId) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; // Obtiene los datos del localStorage
  return data[gameId] || []; // Retorna el ranking de un juego o un array vacío si no existe
}