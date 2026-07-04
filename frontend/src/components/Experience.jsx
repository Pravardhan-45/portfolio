import { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

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

  const addExperience = () => {
    setExperience([...experience, defaultExperience]);
  };

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Experience</h2>
        <button
          type="button"
          onClick={addExperience}
          className="self-start bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Another Experience
        </button>
      </div>

      <div className="space-y-8">
        {experience.map((entry, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
              <p className="font-semibold text-gray-700">Experience #{index + 1}</p>
              {experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="font-semibold">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={entry.company}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Enter company name"
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <div>
                <label className="font-semibold">Job Role</label>
                <input
                  type="text"
                  name="role"
                  value={entry.role}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Software Developer Intern"
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={entry.startDate}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>
                <div>
                  <label className="font-semibold">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={entry.endDate}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold">Responsibilities</label>
                <textarea
                  name="responsibilities"
                  rows="4"
                  value={entry.responsibilities}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Describe your work..."
                  className="w-full border rounded-lg p-3 mt-2"
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
