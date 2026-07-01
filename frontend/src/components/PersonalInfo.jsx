import { usePortfolio } from '../context/PortfolioContext';

function PersonalInfo() {
  const { personalInfo, setPersonalInfo } = usePortfolio();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div>
          <label className="font-semibold">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div>
          <label className="font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={personalInfo.location}
            onChange={handleChange}
            placeholder="Enter your location"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="font-semibold">Profile Image</label>
          <input
            type="file"
            name="profilePhoto"
            onChange={(e) => setPersonalInfo({ ...personalInfo, profilePhoto: e.target.files?.[0] || null })}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;