import { usePortfolio } from '../context/PortfolioContext';

function Achievements() {
  const { achievements, setAchievements } = usePortfolio();

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">Achievements</h2>
      <div>
        <label className="font-semibold">Achievements</label>
        <textarea
          rows="4"
          value={achievements}
          onChange={(e) => setAchievements(e.target.value)}
          placeholder="Highlight any awards, recognitions, or notable outcomes"
          className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        ></textarea>
      </div>
    </div>
  );
}

export default Achievements;
