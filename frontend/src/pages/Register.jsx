import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, saveAuth } from "../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password) {
      setError("Please fill in your name, email, and password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({
        fullName,
        email,
        password,
        confirmPassword,
      });
      // Registration successful. We don't auto-login.
      // Redirect to login page to force the user to login.
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Unable to create account. Please try again.";
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
          Create Account
        </h1>
        <p className="text-center text-slate-400 text-sm mb-8">Start building your portfolio in minutes</p>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 text-white placeholder-slate-500 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm font-medium"
            />
          </div>

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

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center mt-6 text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
