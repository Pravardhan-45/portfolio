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
          <input type="text" name="fullName" value={personalInfo.fullName} onChange={handleChange} placeholder="Enter your full name" className="w-full border rounded-lg p-3 mt-2" />
        </div>
        <div>
          <label className="font-semibold">Email</label>
          <input type="email" name="email" value={personalInfo.email} onChange={handleChange} placeholder="Enter your email" className="w-full border rounded-lg p-3 mt-2" />
        </div>
        <div>
          <label className="font-semibold">Phone Number</label>
          <input type="tel" name="phone" value={personalInfo.phone} onChange={handleChange} placeholder="Enter phone number" className="w-full border rounded-lg p-3 mt-2" />
        </div>
        <div>
          <label className="font-semibold">Date of Birth</label>
          <input type="date" name="dob" value={personalInfo.dob} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2" />
        </div>
        <div>
          <label className="font-semibold">Gender</label>
          <select name="gender" value={personalInfo.gender} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="font-semibold">City</label>
          <input type="text" name="city" value={personalInfo.city} onChange={handleChange} placeholder="Enter your city" className="w-full border rounded-lg p-3 mt-2" />
        </div>
        <div>
          <label className="font-semibold">State</label>
          <input type="text" name="state" value={personalInfo.state} onChange={handleChange} placeholder="Enter your state" className="w-full border rounded-lg p-3 mt-2" />
        </div>
        <div>
          <label className="font-semibold">Pincode</label>
          <input type="text" name="pincode" value={personalInfo.pincode} onChange={handleChange} placeholder="Enter pincode" className="w-full border rounded-lg p-3 mt-2" />
        </div>
        <div className="md:col-span-2">
          <label className="font-semibold">Address</label>
          <textarea rows="4" name="address" value={personalInfo.address} onChange={handleChange} placeholder="Enter your address" className="w-full border rounded-lg p-3 mt-2"></textarea>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;