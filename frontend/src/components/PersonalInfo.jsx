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
            id="input-fullName"
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
            id="input-email"
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
            id="input-phone"
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
          <label className="font-semibold">Profile Image (.jpg, .jpeg, .png)</label>
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