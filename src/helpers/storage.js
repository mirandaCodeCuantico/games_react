const STORAGE_KEY = "gameScores";

// Guarda la puntuación de un jugador
export function saveScore(gameId, playerName, score) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; 
  const gameScores = data[gameId] || []; 

  gameScores.push({ playerName, score }); 
  gameScores.sort((a, b) => b.score - a.score); 
  data[gameId] = gameScores.slice(0, 5); 

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); 
}
export function getTopScores(gameId) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; 
  return data[gameId] || []; 
}

