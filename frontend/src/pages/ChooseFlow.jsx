import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";

function ChooseFlow() {

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans relative overflow-hidden grid-bg">
      {/* Background Glowing Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px] animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>

      <TopNav />
      
      <div className="max-w-5xl mx-auto py-20 px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight font-display">
            Choose Your Generation Flow
          </h1>
          <p className="text-base text-slate-400 max-w-xl mx-auto font-light">
            Your details are saved! Select how you would like to construct your professional developer portfolio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Edit Information */}
          <div className="glass-dark rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-slate-800/80 hover:border-indigo-500/20 flex flex-col items-center text-center group cursor-pointer">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
              ✏️
            </div>
            <h2 className="text-xl font-bold text-white mb-2 font-display">Update Details</h2>
            <p className="text-slate-400 mb-6 flex-grow text-xs leading-relaxed font-light">
              Add new projects, update your professional experience, or edit your technical skill set.
            </p>
            <Link
              to="/userinfo"
              className="w-full py-3 px-4 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 text-slate-200 font-semibold rounded-xl transition-all text-xs uppercase tracking-wider"
            >
              Edit Form
            </Link>
          </div>

          {/* Card 2: Direct Generation */}
          <div className="glass-dark rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-slate-800/80 hover:border-indigo-500/20 flex flex-col items-center text-center group cursor-pointer">
            <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <h2 className="text-xl font-bold text-white mb-2 font-display">Direct Preview</h2>
            <p className="text-slate-400 mb-6 flex-grow text-xs leading-relaxed font-light">
              Instantly preview and download your portfolio using your saved information without AI modifications.
            </p>
            <Link
              to="/preview"
              className="w-full py-3 px-4 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 text-slate-200 font-semibold rounded-xl transition-all text-xs uppercase tracking-wider"
            >
              Skip AI & Preview
            </Link>
          </div>

          {/* Card 3: AI Optimization */}
          <div className="glass-dark rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-slate-800/80 hover:border-indigo-500/30 flex flex-col items-center text-center group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[9px] tracking-widest font-bold px-3 py-1 rounded-bl-lg uppercase">
              RECOMMENDED
            </div>
            <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
              🤖
            </div>
            <h2 className="text-xl font-bold text-white mb-2 font-display">AI Tailoring</h2>
            <p className="text-slate-400 mb-6 flex-grow text-xs leading-relaxed font-light">
              Upload a Job Description and our AI will automatically optimize your bullet points and highlight matching skills.
            </p>
            <Link
              to="/jd-upload"
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs uppercase tracking-wider"
            >
              Optimize with AI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseFlow;
