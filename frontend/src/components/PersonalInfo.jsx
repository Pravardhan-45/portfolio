import { usePortfolio } from '../context/PortfolioContext';

// Reusable label component
const Label = ({ children, required, optional }) => (
  <label className="font-semibold text-gray-700 text-sm flex items-center gap-1">
    {children}
    {required && <span className="text-red-500 font-bold">*</span>}
    {optional && <span className="text-gray-400 font-normal text-xs">(Optional)</span>}
  </label>
);

function PersonalInfo() {
  const { personalInfo, setPersonalInfo } = usePortfolio();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Personal Information</h2>
      <p className="text-xs text-gray-400 mb-6 flex items-center gap-1">
        <span className="text-red-500 font-bold">*</span> Required fields
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label required>Full Name</Label>
          <input
            id="input-fullName"
            type="text"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <Label required>Email</Label>
          <input
            id="input-email"
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <Label required>Phone Number</Label>
          <input
            id="input-phone"
            type="tel"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <Label required>Location</Label>
          <input
            type="text"
            name="location"
            value={personalInfo.location}
            onChange={handleChange}
            placeholder="City, State"
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="md:col-span-2">
          <Label required>Profile Image (.jpg, .jpeg, .png)</Label>
          <div className="mt-2 flex items-center gap-4">
            {personalInfo.profilePhoto && (
              <img
                src={personalInfo.profilePhoto}
                alt="Profile Preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 shadow-sm"
              />
            )}
            <input
              type="file"
              name="profilePhoto"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPersonalInfo({ ...personalInfo, profilePhoto: reader.result });
                  };
                  reader.readAsDataURL(file);
                } else {
                  setPersonalInfo({ ...personalInfo, profilePhoto: null });
                }
              }}
              className="w-full border rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;