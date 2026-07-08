import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../api/authApi";

function LandingPage() {
  const loggedIn = isLoggedIn();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-2xl font-bold text-gray-900 tracking-tight">PortfolioPro</span>
        </Link>
        <div className="flex items-center gap-4">
          {loggedIn ? (
            <>
              <Link
                to="/choose-flow"
                className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-all shadow-sm hover:shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide border border-blue-200">
          ✨ The ultimate portfolio generator
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
          Build a stunning portfolio <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            in under 5 minutes.
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Showcase your skills, projects, and experience with beautiful, recruiter-ready templates. Optimize your achievements with AI instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {loggedIn ? (
            <Link
              to="/choose-flow"
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:-translate-y-0.5 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:-translate-y-0.5 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
              >
                Create Your Portfolio
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center"
              >
                Login to Dashboard
              </Link>
            </>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 text-left">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">
              Skip the coding. Just fill out our intuitive form and get a fully functional, responsive React portfolio immediately.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
              🤖
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Powered</h3>
            <p className="text-gray-600 leading-relaxed">
              Upload a Job Description and let our AI optimize your resume and achievements to perfectly match what recruiters are looking for.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
              ⬇️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Download & Deploy</h3>
            <p className="text-gray-600 leading-relaxed">
              Download your portfolio as a complete, ready-to-deploy React application source code ZIP file. 100% yours to keep.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
