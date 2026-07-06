import { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

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

  const addProject = () => {
    setProjects([...projects, defaultProject]);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Projects</h2>
        <button
          type="button"
          onClick={addProject}
          className="self-start bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Another Project
        </button>
      </div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
              <p className="font-semibold text-gray-700">Project #{index + 1}</p>
              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="font-semibold">Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={project.name}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Enter project name"
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <div>
                <label className="font-semibold">Project Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={project.description}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Describe your project"
                  className="w-full border rounded-lg p-3 mt-2"
                ></textarea>
              </div>
              <div>
                <label className="font-semibold">Technologies Used</label>
                <input
                  type="text"
                  name="technologies"
                  value={project.technologies}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="React, Java, MySQL..."
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <div>
                <label className="font-semibold">GitHub Repository Link</label>
                <input
                  id={`input-project-${index}-github`}
                  type="url"
                  name="githubLink"
                  value={project.githubLink}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="https://github.com/..."
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <div>
                <label className="font-semibold">Live Demo Link</label>
                <input
                  id={`input-project-${index}-live`}
                  type="url"
                  name="liveLink"
                  value={project.liveLink}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="https://..."
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

export default Projects;
