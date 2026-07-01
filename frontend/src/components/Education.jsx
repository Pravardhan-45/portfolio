import { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

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

  const addEducation = () => {
    setEducation([...education, defaultEducation]);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Education</h2>
        <button
          type="button"
          onClick={addEducation}
          className="self-start bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Another Education
        </button>
      </div>

      <div className="space-y-8">
        {education.map((entry, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
              <p className="font-semibold text-gray-700">Education #{index + 1}</p>
              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold">College / University</label>
                <input
                  type="text"
                  name="institute"
                  value={entry.institute}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Enter college name"
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <div>
                <label className="font-semibold">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={entry.degree}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="B.Tech, M.Tech, etc."
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <div>
                <label className="font-semibold">Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={entry.branch}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Computer Science"
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <div>
                <label className="font-semibold">CGPA / Percentage</label>
                <input
                  type="text"
                  name="grade"
                  value={entry.grade}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Enter CGPA"
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <div>
                <label className="font-semibold">Start Year</label>
                <input
                  type="number"
                  name="startYear"
                  value={entry.startYear}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="2022"
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <div>
                <label className="font-semibold">End Year</label>
                <input
                  type="number"
                  name="endYear"
                  value={entry.endYear}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="2026"
                  className="w-full border rounded-lg p-3 mt-2"
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
