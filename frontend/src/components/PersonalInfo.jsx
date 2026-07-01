function PersonalInfo() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="font-semibold">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter phone number"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Date of Birth</label>
          <input
            type="date"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Gender</label>
          <select className="w-full border rounded-lg p-3 mt-2">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">City</label>
          <input
            type="text"
            placeholder="Enter your city"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">State</label>
          <input
            type="text"
            placeholder="Enter your state"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Pincode</label>
          <input
            type="text"
            placeholder="Enter pincode"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Address</label>
          <textarea
            rows="4"
            placeholder="Enter your address"
            className="w-full border rounded-lg p-3 mt-2"
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Profile Photo</label>
          <input
            type="file"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">Resume</label>
          <input
            type="file"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

      </div>

    </div>
  );
}

export default PersonalInfo;