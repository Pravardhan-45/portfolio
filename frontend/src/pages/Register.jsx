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
          Create Account
        </h1>
        <p className="text-center text-slate-500 mb-8">Start building your portfolio in minutes</p>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-slate-200 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-slate-200 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-center mt-6 text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:text-purple-600 transition-colors">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
