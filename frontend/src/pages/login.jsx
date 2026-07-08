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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 relative px-4 overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-300/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-blue-300/40 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-all bg-white px-5 py-2.5 rounded-full shadow-sm hover:shadow-md z-20"
      >
        <span>←</span> Back to Home
      </Link>

      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md relative z-10 border border-white/60 animate-fade-in-up"
      >
        <h1 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Portfolio Builder
        </h1>
        <p className="text-center text-slate-500 mb-8">Welcome back — log in to continue</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-slate-200 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-slate-200 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-6 text-slate-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold hover:text-purple-600 transition-colors">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
