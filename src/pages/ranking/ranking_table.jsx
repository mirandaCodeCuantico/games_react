export default function RankingTable({ ranking }) {
    if (ranking.length === 0) {
      return <p className="text-gray-500">No hay puntuaciones aún.</p>;
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Jugador</th>
              <th className="px-4 py-2 border-b">Puntuación</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((entry, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{entry.playerName}</td>
                <td className="px-4 py-2 border-b">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }