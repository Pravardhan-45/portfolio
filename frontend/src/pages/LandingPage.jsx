import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../api/authApi";

function LandingPage() {
  const loggedIn = isLoggedIn();
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [openFaq, setOpenFaq] = useState(null);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const mockPortfolio = {
    name: "Jane Doe",
    role: "Senior Full Stack Developer",
    about: "I build high-performance web applications and scalable cloud systems. Obsessed with clean code, user experience, and database optimization.",
    skills: ["React.js", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB", "Docker", "AWS"],
    projects: [
      { title: "SaaS Analytics Engine", desc: "Real-time user event tracking system handling 10M+ daily events.", tech: "Next.js, Redis, Go" },
      { title: "AI Code Assistant", desc: "VS Code extension providing context-aware AI refactoring tips.", tech: "TypeScript, OpenAI" }
    ],
    experience: [
      { role: "Lead Engineer", company: "Velocty Tech", duration: "2023 - Present" },
      { role: "Full Stack Developer", company: "InnovateLabs", duration: "2020 - 2023" }
    ]
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
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wide border border-indigo-500/20 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          Revolutionary AI Portfolio Builder
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-8 font-display">
          Launch your portfolio <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            in under 5 minutes.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
          Stop coding portfolio sites from scratch. Fill in your achievements, upload a job description, and let our advanced AI generate a tailored, professional developer website instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {loggedIn ? (
            <Link
              to="/choose-flow"
              className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-base hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 flex items-center justify-center gap-2 group"
            >
              Go to Dashboard
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-base hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 flex items-center justify-center gap-2 group"
              >
                Create Your Portfolio
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              <Link
                to="/login"
                className="w-full px-8 py-4 bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700/80 rounded-xl font-bold text-base transition-all flex items-center justify-center backdrop-blur-sm"
              >
                Login to Dashboard
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Interactive Template Sandbox */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight font-display">
            Three Gorgeous, Curated Themes
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light">
            Toggle the switches below to see how your portfolio instantly transforms between different professional styles.
          </p>
        </div>

        {/* Theme Toggles */}
        <div className="flex justify-center gap-3 mb-8">
          {["minimal", "modern", "executive"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTheme(t)}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all border uppercase tracking-wider ${
                selectedTheme === t
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/60"
              }`}
            >
              {t === "minimal" ? "🎨 Minimalist" : t === "modern" ? "✨ Modern Dark" : "💼 Executive"}
            </button>
          ))}
        </div>

        {/* Live Mock Screen Frame */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800/80 shadow-2xl p-2 relative overflow-hidden backdrop-blur-sm">
          {/* Header Bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-900 bg-slate-950/60 rounded-t-xl">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            <div className="bg-slate-900 text-slate-500 text-xs px-8 py-1 rounded-md mx-auto truncate max-w-xs font-mono">
              https://pravardhan.dev
            </div>
          </div>

          {/* Sandbox Render Window */}
          <div className="bg-slate-900 min-h-[400px] p-8 md:p-12 transition-all duration-500">
            {/* 1. Minimalist Theme (Light, Typography-focused) */}
            {selectedTheme === "minimal" && (
              <div className="text-slate-800 bg-slate-50 p-8 rounded-xl shadow-inner max-w-3xl mx-auto font-serif">
                <h3 className="text-4xl font-light tracking-tight mb-2 border-b border-slate-200 pb-3">{mockPortfolio.name}</h3>
                <p className="text-indigo-600 uppercase text-xs font-bold tracking-widest mb-6 font-sans">{mockPortfolio.role}</p>
                <p className="text-slate-600 leading-relaxed text-sm mb-8 font-sans">{mockPortfolio.about}</p>
                
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-200 font-sans">
                  <div>
                    <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-3">Key Competencies</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockPortfolio.skills.slice(0, 5).map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-slate-200/60 text-slate-700 text-xs font-medium rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-3">Featured Projects</h4>
                    {mockPortfolio.projects.map((p) => (
                      <div key={p.title} className="mb-3">
                        <h5 className="font-semibold text-sm text-slate-800">{p.title}</h5>
                        <p className="text-slate-500 text-xs leading-normal">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Modern Dark Theme (Gradients, Dark Cards) */}
            {selectedTheme === "modern" && (
              <div className="text-slate-100 max-w-4xl mx-auto animate-fade-in-up">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                  <div>
                    <h3 className="text-4xl font-extrabold text-white font-display mb-1">{mockPortfolio.name}</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 font-semibold">{mockPortfolio.role}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mockPortfolio.skills.map((s) => (
                      <span key={s} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-slate-800/40 border border-slate-800 rounded-2xl mb-8">
                  <p className="text-slate-300 text-sm leading-relaxed">{mockPortfolio.about}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {mockPortfolio.projects.map((p) => (
                    <div key={p.title} className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors">
                      <span className="text-slate-500 text-[10px] uppercase font-bold font-mono tracking-wider">{p.tech}</span>
                      <h4 className="font-bold text-lg text-white mt-1 mb-2">{p.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Executive Theme (Classic Corporate layout) */}
            {selectedTheme === "executive" && (
              <div className="text-slate-900 bg-white p-8 rounded-xl shadow-lg border border-slate-100 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="md:border-r md:border-slate-100 md:pr-8 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-4xl mb-4">👤</div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900">{mockPortfolio.name}</h3>
                  <p className="text-slate-500 text-xs font-semibold mb-6 mt-1 uppercase tracking-wider">{mockPortfolio.role}</p>
                  
                  <div className="w-full border-t border-slate-100 pt-6">
                    <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-3">Technical Tools</h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                      {mockPortfolio.skills.map((s) => (
                        <li key={s} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Professional Profile</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">{mockPortfolio.about}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Professional History</h4>
                    <div className="space-y-4">
                      {mockPortfolio.experience.map((e) => (
                        <div key={e.role} className="flex justify-between items-start gap-4">
                          <div>
                            <h5 className="font-bold text-sm text-slate-800">{e.role}</h5>
                            <span className="text-xs text-slate-500">{e.company}</span>
                          </div>
                          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">{e.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 font-display">
            A Better Way to Show Off Your Code
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light">
            Everything you need to create, optimize, and completely own your personal branding.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: AI (Double Width) */}
          <div className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-800/80 hover:border-indigo-500/30 transition-all group flex flex-col md:flex-row items-center gap-8">
            <div className="space-y-4 md:max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-2xl">
                🤖
              </div>
              <h3 className="text-2xl font-bold text-white font-display">AI Resume Tailoring</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Upload a Job Description as PDF. Our AI automatically parses requirements and highlights key matching skills, drafts optimized bios, and appends missing competencies as <b>(Learning)</b> to show self-growth.
              </p>
            </div>
            
            {/* Visual Panel mock */}
            <div className="w-full flex-grow p-4 bg-slate-950/60 border border-slate-800 rounded-xl font-mono text-[10px] text-slate-400 space-y-3">
              <div className="flex justify-between items-center text-purple-400 font-bold border-b border-slate-900 pb-2">
                <span>⚡ AI OPTIMIZER</span>
                <span className="bg-purple-500/20 text-[8px] px-2 py-0.5 rounded-full">ACTIVE</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 uppercase font-bold text-[8px]">Highlighted Skills</span>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-indigo-900/30 border border-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">React</span>
                  <span className="bg-indigo-900/30 border border-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">GraphQL</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 uppercase font-bold text-[8px]">Added Missing Competencies</span>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-emerald-950/50 border border-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">Docker (Learning)</span>
                  <span className="bg-emerald-950/50 border border-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">AWS (Learning)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 3 Themes (Single Width) */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-800/80 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-2xl mb-6">
                🎨
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-3">3 Tailored Layouts</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Beautiful, fully responsive designs tailored to different professional audiences. Switch styles dynamically with a click.
              </p>
            </div>
            
            {/* Visual circles */}
            <div className="flex items-center gap-3 mt-6 border-t border-slate-800/50 pt-4">
              <span className="w-4 h-4 rounded-full bg-slate-50 border border-slate-300 shadow"></span>
              <span className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700 shadow"></span>
              <span className="w-4 h-4 rounded-full bg-indigo-600 border border-indigo-500 shadow"></span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-mono ml-auto">Vite Powered</span>
            </div>
          </div>

          {/* Card 3: Standalone ZIP (Single Width) */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-800/80 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mb-6">
                ⬇️
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-3">Full Code Export</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Download your complete portfolio as a standalone React app ZIP. No lock-in, no ongoing subscription fees.
              </p>
            </div>
            
            <div className="mt-6 border-t border-slate-800/50 pt-4">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <span>📁 src/</span>
                <span>•</span>
                <span>📁 components/</span>
                <span>•</span>
                <span>⚙️ package.json</span>
              </div>
            </div>
          </div>

          {/* Card 4: Complete Freedom (Double Width) */}
          <div className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-800/80 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center text-2xl mb-6">
                🚀
              </div>
              <h3 className="text-2xl font-bold text-white font-display mb-3">Host Anywhere in the World</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Because we export clean React components powered by Vite, you can deploy your portfolio directly to free hosting services like <b>Vercel, Netlify, or Github Pages</b> in under a minute. Keep full ownership of your domain name and code repository forever.
              </p>
            </div>
            <div className="flex items-center gap-6 mt-6 border-t border-slate-800/50 pt-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono">Compatible Deployments</span>
              <div className="flex items-center gap-3 text-slate-300 font-semibold text-xs">
                <span>Vercel</span>
                <span>•</span>
                <span>Netlify</span>
                <span>•</span>
                <span>GitHub Pages</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works (Timeline) */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10 border-t border-slate-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 font-display">
            How It Works
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light">
            Simple 3-step workflow to get you set up in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 z-0"></div>

          {/* Step 1 */}
          <div className="relative z-10 text-center flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold text-lg text-indigo-400 shadow-xl">
              1
            </div>
            <h3 className="text-lg font-bold text-white font-display">Fill Out Details</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-light">
              Create an account and fill in your education, experience, achievements, and project links. Returning users get their profiles safely preloaded.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 text-center flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold text-lg text-purple-400 shadow-xl">
              2
            </div>
            <h3 className="text-lg font-bold text-white font-display">Upload Job Description</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-light">
              Add a target JD PDF. The system automatically tailors your portfolio, summary, and lists missing skills as active learning targets.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 text-center flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold text-lg text-pink-400 shadow-xl">
              3
            </div>
            <h3 className="text-lg font-bold text-white font-display">Download ZIP</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-light">
              Instantly preview all themes, select the one you like, and download your production-ready standalone source code.
            </p>
          </div>
        </div>
      </section>

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
              className="rounded-xl border border-slate-800 bg-slate-800/20 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full flex justify-between items-center p-6 text-left font-bold text-white hover:text-indigo-400 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-lg text-slate-500">{openFaq === i ? "−" : "+"}</span>
              </button>
              
              {openFaq === i && (
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-900 pt-4 animate-fade-in-up">
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
