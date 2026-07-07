import { usePortfolio } from '../context/PortfolioContext';

const Label = ({ children, required, optional }) => (
  <label className="font-semibold text-gray-700 text-sm flex items-center gap-1">
    {children}
    {required && <span className="text-red-500 font-bold">*</span>}
    {optional && <span className="text-gray-400 font-normal text-xs">(Optional)</span>}
  </label>
);

function Certifications() {
  const { certifications, setCertifications } = usePortfolio();

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">Certifications</h2>
      <p className="text-xs text-gray-400 mb-6 flex items-center gap-1">
        <span className="text-red-500 font-bold">*</span> Required fields
      </p>
      <div>
        <Label required>Certifications / Courses</Label>
        <textarea
          rows="4"
          value={certifications}
          onChange={(e) => setCertifications(e.target.value)}
          placeholder="List certifications or completed courses separated by commas"
          className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        ></textarea>
      </div>
    </div>
  );
}

export default Certifications;
