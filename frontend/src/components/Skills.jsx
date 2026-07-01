import { usePortfolio } from '../context/PortfolioContext';

function Skills() {
  const { skills, setSkills } = usePortfolio();

  // Combine string into array
  const handleSkillChange = (e) => {
    // Just a quick way to store raw text in the skills array for now
    // We will parse it in JDUpload when sending
    setSkills([e.target.value]); 
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Skills</h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="font-semibold">All Skills (Comma Separated)</label>
          <textarea
            rows="4"
            placeholder="Java, Python, C, HTML, CSS, React..."
            className="w-full border rounded-lg p-3 mt-2"
            value={skills.join(", ")}
            onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()))}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Skills;