import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../api/authApi";
import developerIllustration from "../assets/developer_illustration.jpg";

function LandingPage() {
  const loggedIn = isLoggedIn();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Is it completely free to download the source code?",
      a: "Yes! Once you generate your portfolio, you can download a full, ready-to-run React source code bundle as a ZIP file. It is 100% yours to keep, host, or customize."
    },
    {
      q: "How does the AI Job Tailoring feature work?",
      a: "Simply upload a PDF of the job description you are targeting. Our integrated Gemini AI automatically reviews your skills and experience against the requirements, suggests missing keywords, highlights matching achievements, and drafts a tailored bio."
    },
    {
      q: "Can I host the downloaded portfolio on my own domain?",
      a: "Absolutely! The exported portfolio is a standard React and Vite project. You can deploy it to Vercel, Netlify, Github Pages, or your own private VPS with just a few clicks."
    },
    {
      q: "What templates are currently available?",
      a: "We currently offer three professionally curated themes: Minimalist (light & text-focused), Modern (sleek dark mode with gradient cards), and Executive Sidebar (formal layout designed for corporate roles)."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans relative overflow-hidden grid-bg">
      {/* Soft Background Glowing Blobs for Premium Light Theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] animate-blob pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[120px] animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-pink-500/5 blur-[120px] animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* Header / Navbar */}
      <header className="border-b border-slate-200/60 backdrop-blur-md sticky top-0 z-50 bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-extrabold text-xl font-display">P</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 font-display">
              Portfolio<span className="text-indigo-600">Pro</span>
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            {loggedIn ? (
              <>
                <Link
                  to="/choose-flow"
                  className="text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200/60"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* Left Column */}
          <div className="text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs uppercase tracking-wider animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              🚀 Portfolio Builder
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight font-display">
              Build Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
                Dream Portfolio
              </span>
              in Minutes.
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed font-light max-w-xl">
              Create beautiful developer portfolios using modern templates, AI-powered content generation, resume optimization, and one-click packaging.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {loggedIn ? (
                <Link
                  to="/choose-flow"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider font-display flex items-center gap-2 group"
                >
                  Go to Dashboard
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider font-display"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 rounded-xl border border-indigo-200 hover:border-indigo-300 text-indigo-600 hover:bg-indigo-50/50 font-bold text-sm transition-all uppercase tracking-wider font-display bg-white/60 backdrop-blur-sm shadow-sm"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-2 gap-5 pt-8 max-w-md">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-md transition-shadow">
                <h3 className="font-black text-indigo-600 text-4xl font-display">50+</h3>
                <p className="text-slate-400 text-xs mt-2 uppercase font-bold tracking-wider font-mono">
                  Professional Templates
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-md transition-shadow">
                <h3 className="font-black text-indigo-600 text-4xl font-display">AI</h3>
                <p className="text-slate-400 text-xs mt-2 uppercase font-bold tracking-wider font-mono">
                  Resume Optimization
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Illustration & Overlay Cards) */}
          <div className="relative flex justify-center items-center">
            {/* Main Illustration */}
            <div className="w-full max-w-lg rounded-3xl overflow-hidden border border-slate-200/40 bg-white p-4 shadow-[0_20px_50px_rgba(99,102,241,0.05)]">
              <img
                src={developerIllustration}
                alt="Developer Illustration"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>

            {/* Floating Card 1: Top Left */}
            <div className="absolute -top-6 -left-6 md:-top-4 md:-left-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)] p-4 flex items-center gap-3 animate-blob">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center text-xl">
                📂
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm font-display">Portfolio</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1 font-mono">
                  <span>Published Successfully</span>
                  <span className="text-emerald-500">✅</span>
                </p>
              </div>
            </div>

            {/* Floating Card 2: Bottom Right */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-4 md:-right-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)] p-4 flex flex-col gap-1.5 animate-blob animation-delay-2000">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Target Stack</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span className="font-bold text-slate-800 text-xs">React • Node • MongoDB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid (Bottom) */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-md transition-shadow">
            <div className="text-4xl w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">🎨</div>
            <h3 className="font-bold text-slate-800 text-lg mt-6 font-display">
              Beautiful Templates
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-3 font-light">
              Choose from clean, responsive developer templates crafted to impress recruiter review stages.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-md transition-shadow">
            <div className="text-4xl w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100">🤖</div>
            <h3 className="font-bold text-slate-800 text-lg mt-6 font-display">
              AI Assistance
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-3 font-light">
              Analyze targets to automatically align summaries, experience highlights, and projects to match job descriptions.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-md transition-shadow">
            <div className="text-4xl w-14 h-14 rounded-xl bg-pink-50 flex items-center justify-center border border-pink-100">🚀</div>
            <h3 className="font-bold text-slate-800 text-lg mt-6 font-display">
              One Click Download
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-3 font-light">
              Export your entire portfolio as a clean React/Vite project directory ZIP file with full code ownership.
            </p>
          </div>
        </div>
      </main>

      {/* Accordion FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 relative z-10 border-t border-slate-200/60">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 font-display">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.01)] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full flex justify-between items-center p-6 text-left font-bold text-slate-800 hover:text-indigo-600 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-lg text-slate-400">{openFaq === i ? "−" : "+"}</span>
              </button>
              
              {openFaq === i && (
                <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4 animate-fade-in-up font-light">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 py-12 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">P</span>
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900">
              Portfolio<span className="text-indigo-600">Pro</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-400 text-xs">
            <span>© 2026 PortfolioPro. All rights reserved.</span>
            <span>•</span>
            <Link to="/login" className="hover:text-slate-600">Login</Link>
            <span>•</span>
            <Link to="/register" className="hover:text-slate-600">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
