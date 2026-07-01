import { usePortfolio } from '../context/PortfolioContext';

function Certifications() {
  const { certifications, setCertifications } = usePortfolio();

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Certifications</h2>
      <div>
        <label className="font-semibold">Certifications / Courses</label>
        <textarea
          rows="4"
          value={certifications}
          onChange={(e) => setCertifications(e.target.value)}
          placeholder="List certifications or completed courses separated by commas"
          className="w-full border rounded-lg p-3 mt-2"
        ></textarea>
      </div>
    </div>
  );
}

export default Certifications;
