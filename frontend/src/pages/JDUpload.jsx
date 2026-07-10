import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import authClient from '../api/authApi';
import TopNav from '../components/TopNav';

function JDUpload() {
  const { personalInfo, skills, projects, experience, education, achievements, certifications } = usePortfolio();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState('');

  const renderArray = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => typeof item === 'string' ? item : JSON.stringify(item));
    }
    if (typeof data === 'string') return data.split(',').map(s => s.trim()).filter(Boolean);
    return [];
  };

  const safeString = (data) => {
    if (typeof data === 'string') return data;
    if (data == null) return "Analysis did not provide this information.";
    if (Array.isArray(data)) return data.map(item => typeof item === 'object' ? JSON.stringify(item) : String(item)).join(", ");
    if (typeof data === 'object') return JSON.stringify(data);
    return String(data);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a PDF job description first.");
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('jdFile', file);
      
      const portfolioData = {
        name: personalInfo.fullName || "User",
        skills: skills.map(s => s.name || s),
        projects: projects,
        experience: experience,
        education: education,
        achievements: achievements,
        certifications: certifications
      };
      formData.append('portfolio', JSON.stringify(portfolioData));

      const response = await authClient.post('/ai/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuggestions(response.data.data);
    } catch (err) {
      setError(err.message || 'Failed to analyze portfolio');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans relative overflow-hidden grid-bg">
      {/* Background Glowing Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px] animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>

      <TopNav />
      <div className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight font-display">
              AI Portfolio Analyzer
            </h1>
            <p className="text-base text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Upload the Job Description you are targeting, and our AI will generate a highly optimized portfolio tailored specifically to the role.
            </p>
          </div>

          {/* Upload Card */}
          <div className="glass-dark shadow-2xl rounded-2xl p-8 md:p-10 border border-slate-800/80">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl p-8 bg-slate-950/20 hover:bg-slate-950/40 transition-colors">
              <svg className="w-12 h-12 text-indigo-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <label className="block text-slate-200 font-bold mb-2 text-lg">Upload Job Description</label>
              <p className="text-xs text-slate-500 mb-4">Must be a valid PDF file</p>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full max-w-md text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-slate-800 file:text-xs file:font-semibold file:bg-slate-800 file:text-indigo-400 hover:file:bg-slate-700/60 transition-all cursor-pointer"
              />
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl flex items-center gap-3 font-medium text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                {error}
              </div>
            )}
            
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 text-base uppercase tracking-wider font-display"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing AI Strategy...
                </>
              ) : 'Generate AI Optimized Portfolio'}
            </button>
          </div>

          {/* AI Output Section */}
          {suggestions && (
            <div className="mt-16 space-y-8 animate-fade-in-up">
              <div className="text-center">
                <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full">Analysis Complete</span>
                <h2 className="text-3xl font-extrabold text-white mt-4 font-display">AI Optimization Results</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Summary Card */}
                <div className="glass-dark p-6 rounded-2xl border border-slate-800 md:col-span-2 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                  <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2 font-display">
                    <span>🎯</span> Generated Summary
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm font-light">{safeString(suggestions.generatedSummary)}</p>
                </div>

                {/* Highlight Skills Card */}
                <div className="glass-dark p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                  <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2 font-display">
                    <span>✨</span> Skills to Highlight
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {renderArray(suggestions.highlightSkills).map((skill, i) => (
                      <span key={i} className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-semibold">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills Card */}
                <div className="glass-dark p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                  <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2 font-display">
                    <span>⚠️</span> Missing Skills (Learn These)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {renderArray(suggestions.missingSkills).map((skill, i) => (
                      <span key={i} className="px-3.5 py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-semibold">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Recommended Projects Card */}
                <div className="glass-dark p-6 rounded-2xl border border-slate-800 md:col-span-2 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                  <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2 font-display">
                    <span>🚀</span> Recommended Projects
                  </h3>
                  <ul className="space-y-3">
                    {renderArray(suggestions.recommendedProjects).map((proj, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-slate-300 font-light leading-relaxed">{proj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/preview', { state: { suggestions } })}
                className="w-full mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 text-base uppercase tracking-wider font-display"
              >
                Preview AI-Optimized Portfolio
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JDUpload;
