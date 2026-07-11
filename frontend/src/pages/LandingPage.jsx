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
      a: "We currently offer four professionally curated themes: Minimalist (light & typography-focused), Modern (sleek dark mode with indigo highlights), Professional (formal executive layout designed for corporate roles), and TechPro (sleek dark mode developer layout with branch timeline highlights)."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans relative overflow-hidden grid-bg">
      {/* Background Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] animate-blob pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px] animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-pink-500/5 blur-[120px] animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* Header / Navbar */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-slate-900/85">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-extrabold text-xl font-display">P</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-white font-display bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              Portfolio<span className="text-indigo-400">Pro</span>
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            {loggedIn ? (
              <>
                <Link
                  to="/choose-flow"
                  className="text-slate-300 hover:text-white font-medium text-sm transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 transition-all border border-slate-700/50 hover:border-slate-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white font-medium text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
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
          <div className="text-left space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wide border border-indigo-500/20 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              🚀 Portfolio Builder
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight font-display">
              Build Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Dream Portfolio
              </span>
              in Minutes.
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed font-light max-w-xl">
              Create beautiful developer portfolios using modern templates, AI-powered content generation, resume optimization, and one-click packaging.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {loggedIn ? (
                <Link
                  to="/choose-flow"
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-base hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 flex items-center justify-center gap-2 group"
                >
                  Go to Dashboard
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-base hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 flex items-center justify-center gap-2"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700/80 rounded-xl font-bold text-base transition-all flex items-center justify-center backdrop-blur-sm shadow-sm"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-2 gap-5 pt-8 max-w-md">
              <div className="glass-dark rounded-2xl border border-slate-800/80 p-5 shadow-xl hover:border-slate-700 transition-colors">
                <h3 className="font-black text-indigo-400 text-4xl font-display">4</h3>
                <p className="text-slate-500 text-[10px] mt-2 uppercase font-bold tracking-wider font-mono">
                  Professional Templates
                </p>
              </div>

              <div className="glass-dark rounded-2xl border border-slate-800/80 p-5 shadow-xl hover:border-slate-700 transition-colors">
                <h3 className="font-black text-indigo-400 text-4xl font-display">AI</h3>
                <p className="text-slate-500 text-[10px] mt-2 uppercase font-bold tracking-wider font-mono">
                  Resume Optimization
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Illustration) */}
          <div className="flex justify-center items-center">
            {/* Main Illustration Panel */}
            <div className="w-full max-w-lg rounded-3xl overflow-hidden border border-slate-800/60 bg-white p-4 shadow-[0_20px_50px_rgba(99,102,241,0.15)]">
              <img
                src={developerIllustration}
                alt="Developer Illustration"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Feature Cards Grid (Bottom) */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          <div className="glass-dark rounded-2xl border border-slate-800/80 p-8 shadow-xl hover:border-slate-700 transition-colors">
            <div className="text-4xl w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">🎨</div>
            <h3 className="font-bold text-white text-lg mt-6 font-display">
              Beautiful Templates
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-3 font-light">
              Choose from clean, responsive developer templates crafted to impress recruiter review stages.
            </p>
          </div>

          <div className="glass-dark rounded-2xl border border-slate-800/80 p-8 shadow-xl hover:border-slate-700 transition-colors">
            <div className="text-4xl w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">🤖</div>
            <h3 className="font-bold text-white text-lg mt-6 font-display">
              AI Assistance
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-3 font-light">
              Analyze targets to automatically align summaries, experience highlights, and projects to match job descriptions.
            </p>
          </div>

          <div className="glass-dark rounded-2xl border border-slate-800/80 p-8 shadow-xl hover:border-slate-700 transition-colors">
            <div className="text-4xl w-14 h-14 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 text-pink-400">🚀</div>
            <h3 className="font-bold text-white text-lg mt-6 font-display">
              One Click Download
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-3 font-light">
              Export your entire portfolio as a clean React/Vite project directory ZIP file with full code ownership.
            </p>
          </div>
        </div>
      </main>

      {/* Accordion FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 font-display">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-800 bg-slate-800/20 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full flex justify-between items-center p-6 text-left font-bold text-white hover:text-indigo-400 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-lg text-slate-500">{openFaq === i ? "−" : "+"}</span>
              </button>
              
              {openFaq === i && (
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-900 pt-4 animate-fade-in-up font-light">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 bg-slate-950/40 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">P</span>
            </div>
            <span className="font-bold text-sm tracking-tight text-white">
              Portfolio<span className="text-indigo-400">Pro</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-500 text-xs">
            <span>© 2026 PortfolioPro. All rights reserved.</span>
            <span>•</span>
            <Link to="/login" className="hover:text-slate-300">Login</Link>
            <span>•</span>
            <Link to="/register" className="hover:text-slate-300">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
