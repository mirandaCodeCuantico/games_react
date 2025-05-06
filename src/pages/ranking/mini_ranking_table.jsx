export default function MiniRankingTable({ ranking }) {
    if (ranking.length === 0) {
      return <p className="text-gray-400 italic">Sin puntuaciones aún.</p>;
    }
  
    return (
      <table className="w-full text-sm bg-[#0f0f3a] border border-cyan-400 rounded shadow-md">
        <thead>
          <tr className="text-cyan-300 bg-cyan-900 text-left">
            <th className="px-3 py-1 border-b border-cyan-400">#</th>
            <th className="px-3 py-1 border-b border-cyan-400">Jugador</th>
            <th className="px-3 py-1 border-b border-cyan-400">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {ranking.slice(0, 3).map((entry, index) => (
            <tr
              key={index}
              className={`${
                index === 0 ? "bg-yellow-400 text-black font-semibold" : "text-white"
              } hover:bg-[#1b2b40] transition-colors`}
            >
              <td className="px-3 py-1 border-b border-cyan-400">{index + 1}</td>
              <td className="px-3 py-1 border-b border-cyan-400">{entry.playerName}</td>
              <td className="px-3 py-1 border-b border-cyan-400">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  