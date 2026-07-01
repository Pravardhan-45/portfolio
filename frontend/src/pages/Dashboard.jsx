import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-600 text-white p-5 shadow-md">
        <h1 className="text-3xl font-bold">Portfolio Builder</h1>
        <p>Welcome to your dashboard</p>
      </div>

      {/* Main Content */}
      <div className="p-8">

        <h2 className="text-2xl font-bold mb-6">
          Dashboard
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Link
            to="/userinfo"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl"
          >
            <h2 className="text-2xl font-bold text-blue-600">
              User Information
            </h2>

            <p className="text-gray-600 mt-2">
              Fill your personal details
            </p>
          </Link>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-green-600">
              Portfolio Preview
            </h2>

            <p className="text-gray-600 mt-2">
              Available after completing your profile.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;