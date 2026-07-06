import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import axios from 'axios';

function JDUpload() {
  const { personalInfo, skills, projects, experience } = usePortfolio();
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
        experience: experience
      };
      formData.append('portfolio', JSON.stringify(portfolioData));

      // Assuming backend runs on 5000
      const response = await axios.post('/api/ai/analyze', formData, {
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
    <div className="min-h-screen bg-slate-50 py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            AI Portfolio Analyzer
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Upload the Job Description you are targeting, and our AI will generate a highly optimized portfolio tailored specifically to the role.
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-slate-100">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-xl p-8 bg-indigo-50/30 hover:bg-indigo-50/80 transition-colors">
            <svg className="w-12 h-12 text-indigo-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <label className="block text-slate-700 font-bold mb-2 text-lg">Upload Job Description</label>
            <p className="text-sm text-slate-500 mb-4">Must be a valid PDF file</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full max-w-md text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all cursor-pointer"
            />
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-100 rounded-lg flex items-center gap-3 font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              {error}
            </div>
          )}
          
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 text-lg"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
          <div className="mt-12 space-y-8 animate-fade-in-up">
            <div className="text-center">
              <span className="bg-indigo-100 text-indigo-800 text-sm font-bold uppercase tracking-wider py-1.5 px-4 rounded-full">Analysis Complete</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-4">AI Optimization Results</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Summary Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <h3 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-2">
                  <span>🎯</span> Generated Summary
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">{safeString(suggestions.generatedSummary)}</p>
              </div>

              {/* Highlight Skills Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                  <span>✨</span> Skills to Highlight
                </h3>
                <div className="flex flex-wrap gap-2">
                  {renderArray(suggestions.highlightSkills).map((skill, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-semibold">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Missing Skills Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                  <span>⚠️</span> Missing Skills (Learn These)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {renderArray(suggestions.missingSkills).map((skill, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-sm font-semibold">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Recommended Projects Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                  <span>🚀</span> Recommended Projects
                </h3>
                <ul className="space-y-3">
                  {renderArray(suggestions.recommendedProjects).map((proj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      <span className="text-slate-700 font-medium">{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/preview')}
              className="w-full mt-8 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-3 text-lg"
            >
              Preview & Download Portfolio
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JDUpload;
