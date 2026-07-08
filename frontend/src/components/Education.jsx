import { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Label = ({ children, required, optional }) => (
  <label className="font-semibold text-gray-700 text-sm flex items-center gap-1">
    {children}
    {required && <span className="text-red-500 font-bold">*</span>}
    {optional && <span className="text-gray-400 font-normal text-xs">(Optional)</span>}
  </label>
);

function Education() {
  const { education, setEducation } = usePortfolio();

  const defaultEducation = {
    institute: '',
    degree: '',
    branch: '',
    grade: '',
    startYear: '',
    endYear: ''
  };

  useEffect(() => {
    if (education.length === 0) {
      setEducation([defaultEducation]);
    }
  }, [education, setEducation]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...education];
    updated[index] = { ...updated[index], [name]: value };
    setEducation(updated);
  };

  const addEducation = () => setEducation([...education, defaultEducation]);
  const removeEducation = (index) => setEducation(education.filter((_, i) => i !== index));

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Education</h2>
        <button
          type="button"
          onClick={addEducation}
          className="self-start bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          + Add Another Education
        </button>
      </div>
      <p className="text-xs text-gray-400 mb-6 flex items-center gap-1">
        <span className="text-red-500 font-bold">*</span> Required fields
      </p>

      <div className="space-y-8">
        {education.map((entry, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
              <p className="font-semibold text-gray-700">Education #{index + 1}</p>
              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  ✕ Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label required>College / University</Label>
                <input
                  type="text"
                  name="institute"
                  value={entry.institute}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Enter college name"
                  className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <Label required>Degree</Label>
                <input
                  type="text"
                  name="degree"
                  value={entry.degree}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="B.Tech, M.Tech, etc."
                  className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <Label required>Branch / Specialization</Label>
                <input
                  type="text"
                  name="branch"
                  value={entry.branch}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Computer Science"
                  className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <Label required>CGPA / Percentage</Label>
                <input
                  type="text"
                  name="grade"
                  value={entry.grade}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="8.5 / 85%"
                  className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <Label required>Start Date</Label>
                <input
                  type="month"
                  name="startYear"
                  value={entry.startYear}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <Label required>End Date (or Expected)</Label>
                <input
                  id={`input-education-${index}-endYear`}
                  type="month"
                  name="endYear"
                  value={entry.endYear}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;
