import { usePortfolio } from '../context/PortfolioContext';

function Achievements() {
  const { achievements, setAchievements } = usePortfolio();

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Achievements</h2>
      <div>
        <label className="font-semibold">Achievements</label>
        <textarea
          rows="4"
          value={achievements}
          onChange={(e) => setAchievements(e.target.value)}
          placeholder="Highlight any awards, recognitions, or notable outcomes"
          className="w-full border rounded-lg p-3 mt-2"
        ></textarea>
      </div>
    </div>
  );
}

export default Achievements;
