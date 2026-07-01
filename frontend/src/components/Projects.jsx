function Projects() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Projects
      </h2>

      <div className="grid grid-cols-1 gap-6">

        <div>
          <label className="font-semibold">Project Name</label>
          <input
            type="text"
            placeholder="Enter project name"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Project Description</label>
          <textarea
            rows="4"
            placeholder="Describe your project"
            className="w-full border rounded-lg p-3 mt-2"
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Technologies Used</label>
          <input
            type="text"
            placeholder="React, Java, MySQL..."
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">GitHub Repository Link</label>
          <input
            type="url"
            placeholder="https://github.com/..."
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Live Demo Link</label>
          <input
            type="url"
            placeholder="https://..."
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

      </div>

    </div>
  );
}

export default Projects;