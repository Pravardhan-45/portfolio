import { Link, useLocation } from "react-router-dom";
import { logout } from "../api/authApi";
import { usePortfolio } from "../context/PortfolioContext";

function TopNav() {
  const location = useLocation();
  const { personalInfo } = usePortfolio();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const hasPortfolio = Boolean(personalInfo?.fullName);
  const isUserInfoPage = location.pathname === "/userinfo";

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link to={hasPortfolio ? "/choose-flow" : "/userinfo"} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">PortfolioPro</span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          {hasPortfolio && !isUserInfoPage && (
            <Link
              to="/userinfo"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2"
            >
              <span>✏️</span> Edit Form
            </Link>
          )}
          {hasPortfolio && !isUserInfoPage && (
            <Link
              to="/choose-flow"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2"
            >
              <span>📊</span> Dashboard
            </Link>
          )}
          {hasPortfolio && !isUserInfoPage && (
            <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
          )}
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-600 font-medium transition-colors flex items-center gap-2"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
