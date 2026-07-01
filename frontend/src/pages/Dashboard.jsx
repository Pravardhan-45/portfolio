import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-600 text-white p-5 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Builder</h1>
          <p>Welcome to your dashboard</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">

        <h2 className="text-2xl font-bold mb-6">
          Dashboard
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Member 1: User Information */}
          <Link
            to="/userinfo"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-2 border-transparent hover:border-blue-300"
          >
            <h2 className="text-2xl font-bold text-blue-600">
              User Information
            </h2>
            <p className="text-gray-600 mt-2">
              (Member 1) Fill your personal details, skills, and experience.
            </p>
          </Link>

          {/* Member 2: Templates & Preview */}
          <div className="bg-white p-8 rounded-xl shadow-lg opacity-80 border-2 border-dashed border-green-500">
            <h2 className="text-2xl font-bold text-green-600">
              Select Templates
            </h2>
            <p className="text-gray-600 mt-2">
              (Member 2 Work Here) Select from 3+ templates and live preview your portfolio.
            </p>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg cursor-not-allowed">
              Coming Soon
            </button>
          </div>

          {/* Member 3: Backend DB Info */}
          <div className="bg-white p-8 rounded-xl shadow-lg opacity-80 border-2 border-dashed border-red-500">
            <h2 className="text-2xl font-bold text-red-600">
              Database Sync
            </h2>
            <p className="text-gray-600 mt-2">
              (Member 3 Work Here) Backend API connections for saving and retrieving user data.
            </p>
          </div>

          {/* Member 4: Download */}
          <div className="bg-white p-8 rounded-xl shadow-lg opacity-80 border-2 border-dashed border-orange-500">
            <h2 className="text-2xl font-bold text-orange-600">
              Download Source
            </h2>
            <p className="text-gray-600 mt-2">
              (Member 4 Work Here) Generate the portfolio and download the ZIP file.
            </p>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg cursor-not-allowed">
              Coming Soon
            </button>
          </div>

          {/* Member 5: AI Integration */}
          <Link
            to="/jd-upload"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-2 border-transparent hover:border-purple-300"
          >
            <h2 className="text-2xl font-bold text-purple-600">
              AI Job Analysis
            </h2>
            <p className="text-gray-600 mt-2">
              (Member 5) Upload a JD and get customized portfolio suggestions.
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;