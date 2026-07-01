function Experience() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Experience
      </h2>

      <div className="grid grid-cols-1 gap-6">

        <div>
          <label className="font-semibold">Company Name</label>
          <input
            type="text"
            placeholder="Enter company name"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Job Role</label>
          <input
            type="text"
            placeholder="Software Developer Intern"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold">Start Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">End Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

        </div>

        <div>
          <label className="font-semibold">Responsibilities</label>
          <textarea
            rows="4"
            placeholder="Describe your work..."
            className="w-full border rounded-lg p-3 mt-2"
          ></textarea>
        </div>

      </div>

    </div>
  );
}

export default Experience;