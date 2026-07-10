import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, saveAuth } from "../api/authApi";
import { getPortfolio } from "../api/portfolioApi";
import { usePortfolio } from "../context/PortfolioContext";
import { useNotice } from "../context/NoticeContext";
import { isPortfolioComplete } from "../utils/validatePortfolioForm";

function Login() {
  const navigate = useNavigate();
  const { notify } = useNotice();
  const {
    setPersonalInfo,
    setAboutMe,
    setEducation,
    setSkills,
    setProjects,
    setExperience,
    setCertifications,
    setAchievements,
    setSocialLinks,
  } = usePortfolio();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const hydratePortfolio = (portfolio) => {
    setPersonalInfo(portfolio.personalInfo || {});
    setAboutMe(portfolio.aboutMe || "");
    setEducation(portfolio.education || []);
    setSkills(portfolio.skills || []);
    setProjects(portfolio.projects || []);
    setExperience(portfolio.experience || []);
    setCertifications(portfolio.certifications || "");
    setAchievements(portfolio.achievements || "");
    setSocialLinks(portfolio.socialLinks || {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      saveAuth({ token: data.token, user: data.user });

      // Check if user already has a saved (and complete) portfolio
      try {
        const res = await getPortfolio();
        const portfolio = res.portfolio;

        if (portfolio) {
          hydratePortfolio(portfolio);
        }

        if (portfolio && isPortfolioComplete(portfolio)) {
          navigate("/choose-flow");
        } else {
          notify("Please complete your portfolio form to continue.");
          navigate("/userinfo");
        }
      } catch {
        // No saved portfolio yet (404 or error) — send them to the form.
        notify("Let's set up your portfolio — please fill in your details first.");
        navigate("/userinfo");
      }

    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Unable to log in. Please check your connection and try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 grid-bg relative px-4 overflow-hidden text-slate-100">
      {/* Glowing background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px] animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-all bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 px-5 py-2.5 rounded-xl shadow-sm hover:shadow z-20 backdrop-blur-sm"
      >
        <span>←</span> Back to Home
      </Link>

      <form
        onSubmit={handleSubmit}
        className="glass-dark shadow-2xl rounded-2xl p-8 w-full max-w-md relative z-10 border border-slate-800 animate-fade-in-up"
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-extrabold text-xl font-display">P</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent font-display">
          PortfolioPro
        </h1>
        <p className="text-center text-slate-400 text-sm mb-8">Welcome back — sign in to continue</p>

        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 text-white placeholder-slate-500 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm font-medium"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 text-white placeholder-slate-500 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {error && <p className="text-rose-500 text-xs font-semibold mt-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all text-sm"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center mt-6 text-sm text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
