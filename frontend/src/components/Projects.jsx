import { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Label = ({ children, required, optional }) => (
  <label className="font-semibold text-gray-700 text-sm flex items-center gap-1">
    {children}
    {required && <span className="text-red-500 font-bold">*</span>}
    {optional && <span className="text-gray-400 font-normal text-xs">(Optional)</span>}
  </label>
);

function Projects() {
  const { projects, setProjects } = usePortfolio();

  const defaultProject = {
    name: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveLink: ''
  };

  useEffect(() => {
    if (projects.length === 0) {
      setProjects([defaultProject]);
    }
  }, [projects, setProjects]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...projects];
    updated[index] = { ...updated[index], [name]: value };
    setProjects(updated);
  };

  const addProject = () => setProjects([...projects, defaultProject]);
  const removeProject = (index) => setProjects(projects.filter((_, i) => i !== index));

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <h2 className="text-2xl font-bold text-blue-700">Projects</h2>
        <button
          type="button"
          onClick={addProject}
          className="self-start bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Another Project
        </button>
      </div>
      <p className="text-xs text-gray-400 mb-6 flex items-center gap-1">
        <span className="text-red-500 font-bold">*</span> Required fields
      </p>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
              <p className="font-semibold text-gray-700">Project #{index + 1}</p>
              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  ✕ Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label required>Project Name</Label>
                <input
                  type="text"
                  name="name"
                  value={project.name}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Enter project name"
                  className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <Label required>Project Description</Label>
                <textarea
                  name="description"
                  rows="4"
                  value={project.description}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Describe what the project does, your role, and its impact..."
                  className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                ></textarea>
              </div>
              <div>
                <Label required>Technologies Used</Label>
                <input
                  type="text"
                  name="technologies"
                  value={project.technologies}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="React, Java, MySQL, Spring Boot..."
                  className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label required>GitHub Repository Link</Label>
                  <input
                    id={`input-project-${index}-github`}
                    type="url"
                    name="githubLink"
                    value={project.githubLink}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="https://github.com/..."
                    className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <Label optional>Live Demo Link</Label>
                  <input
                    id={`input-project-${index}-live`}
                    type="url"
                    name="liveLink"
                    value={project.liveLink}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="https://..."
                    className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
