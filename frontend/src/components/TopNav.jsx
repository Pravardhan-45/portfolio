import { Link, useLocation } from "react-router-dom";
import { logout } from "../api/authApi";
import { useNavGuard } from "../context/NavGuardContext";

const NAV_LINKS = [
  { to: "/choose-flow", label: "Dashboard", icon: "📊" },
  { to: "/userinfo", label: "Edit Form", icon: "✏️" },
  { to: "/jd-upload", label: "AI Analyzer", icon: "🤖" },
  { to: "/preview", label: "Preview", icon: "👁️" },
];

function TopNav() {
  const location = useLocation();
  const navGuard = useNavGuard();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  // If a page (e.g. the form with unsaved changes) registered a guard, give it
  // a chance to intercept the navigation before the link actually navigates.
  const guardClick = (to) => (e) => {
    if (navGuard && navGuard.runGuard(to)) {
      e.preventDefault();
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center gap-4">
        {/* Logo Section */}
        <Link
          to="/choose-flow"
          onClick={guardClick("/choose-flow")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight hidden sm:inline">PortfolioPro</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-end">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={guardClick(link.to)}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-1.5 ${
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                <span>{link.icon}</span>
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            );
          })}

          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>

          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 font-medium text-sm transition-colors flex items-center gap-1.5"
          >
            <span>🚪</span>
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
