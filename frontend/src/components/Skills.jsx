import { usePortfolio } from '../context/PortfolioContext';

const Label = ({ children, required, optional }) => (
  <label className="font-semibold text-gray-700 text-sm flex items-center gap-1">
    {children}
    {required && <span className="text-red-500 font-bold">*</span>}
    {optional && <span className="text-gray-400 font-normal text-xs">(Optional)</span>}
  </label>
);

function Skills() {
  const { skills, setSkills } = usePortfolio();

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Skills</h2>
      <p className="text-xs text-gray-400 mb-6 flex items-center gap-1">
        <span className="text-red-500 font-bold">*</span> Required fields
      </p>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <Label required>All Skills (Comma Separated)</Label>
          <textarea
            rows="4"
            placeholder="Java, Python, C, HTML, CSS, React..."
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={skills.join(", ")}
            onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()))}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Skills;