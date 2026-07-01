function Skills() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="font-semibold">Programming Languages</label>
          <input
            type="text"
            placeholder="Java, Python, C..."
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Frontend Technologies</label>
          <input
            type="text"
            placeholder="HTML, CSS, React..."
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Backend Technologies</label>
          <input
            type="text"
            placeholder="Node.js, Spring Boot..."
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Database</label>
          <input
            type="text"
            placeholder="MySQL, MongoDB..."
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Tools & Platforms</label>
          <input
            type="text"
            placeholder="Git, GitHub, VS Code..."
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

      </div>

    </div>
  );
}

export default Skills;