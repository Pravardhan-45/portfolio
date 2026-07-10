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
    <nav className="bg-slate-900/85 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center gap-4">
        {/* Logo Section */}
        <Link
          to="/choose-flow"
          onClick={guardClick("/choose-flow")}
          className="flex items-center gap-2.5 hover:opacity-95 transition-opacity shrink-0"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/10">
            <span className="text-white font-extrabold text-base">P</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-display hidden sm:inline">
            Portfolio<span className="text-indigo-400">Pro</span>
          </span>
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
                className={`px-3 py-2 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                  active
                    ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                    : "text-slate-300 border-transparent hover:text-indigo-400 hover:bg-slate-800/50"
                }`}
              >
                <span>{link.icon}</span>
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            );
          })}

          <div className="w-px h-6 bg-slate-800 mx-2 hidden sm:block"></div>

          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
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
