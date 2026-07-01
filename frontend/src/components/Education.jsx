function Education() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Education
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="font-semibold">College / University</label>
          <input
            type="text"
            placeholder="Enter college name"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Degree</label>
          <input
            type="text"
            placeholder="B.Tech, M.Tech, etc."
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Branch</label>
          <input
            type="text"
            placeholder="Computer Science"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">CGPA / Percentage</label>
          <input
            type="text"
            placeholder="Enter CGPA"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Start Year</label>
          <input
            type="number"
            placeholder="2022"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">End Year</label>
          <input
            type="number"
            placeholder="2026"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

      </div>

    </div>
  );
}

export default Education;