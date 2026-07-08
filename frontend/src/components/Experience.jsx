import { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Label = ({ children, required, optional }) => (
  <label className="font-semibold text-gray-700 text-sm flex items-center gap-1">
    {children}
    {required && <span className="text-red-500 font-bold">*</span>}
    {optional && <span className="text-gray-400 font-normal text-xs">(Optional)</span>}
  </label>
);

function Experience() {
  const { experience, setExperience } = usePortfolio();

  const defaultExperience = {
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    responsibilities: ''
  };

  useEffect(() => {
    if (experience.length === 0) {
      setExperience([defaultExperience]);
    }
  }, [experience, setExperience]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...experience];
    updated[index] = { ...updated[index], [name]: value };
    setExperience(updated);
  };

  const addExperience = () => setExperience([...experience, defaultExperience]);
  const removeExperience = (index) => setExperience(experience.filter((_, i) => i !== index));

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Experience</h2>
        <button
          type="button"
          onClick={addExperience}
          className="self-start bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          + Add Another Experience
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-6 flex items-center gap-1 font-medium">
        <span className="text-blue-500 font-bold">ℹ</span> Optional for Freshers (Leave blank if no experience)
      </p>

      <div className="space-y-8">
        {experience.map((entry, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
              <p className="font-semibold text-gray-700">Experience #{index + 1}</p>
              {experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  ✕ Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label>Company Name</Label>
                <input
                  type="text"
                  name="company"
                  value={entry.company}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Enter company name"
                  className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <Label>Job Role / Title</Label>
                <input
                  type="text"
                  name="role"
                  value={entry.role}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Software Developer Intern"
                  className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Start Date</Label>
                  <input
                    type="date"
                    name="startDate"
                    value={entry.startDate}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <input
                    type="date"
                    name="endDate"
                    value={entry.endDate}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
              <div>
                <Label>Responsibilities / Description</Label>
                <textarea
                  name="responsibilities"
                  rows="4"
                  value={entry.responsibilities}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Describe your key responsibilities and achievements..."
                  className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
