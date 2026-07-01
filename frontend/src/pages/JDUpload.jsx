import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import axios from 'axios';

function JDUpload() {
  const { personalInfo, skills, projects, experience } = usePortfolio();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState('');

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
      const response = await axios.post('http://localhost:5000/api/ai/analyze', formData, {
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
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Analyze Job Description</h1>
        
        <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <label className="block text-gray-700 font-semibold mb-2">Upload Job Description (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-gray-600"
          />
        </div>
        
        {error && <p className="text-red-500 mt-2">{error}</p>}
        
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing PDF...' : 'Generate Customized Portfolio'}
        </button>

        {suggestions && (
          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">AI Suggestions</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Generated Summary</h3>
              <p className="mt-2 text-gray-700">{suggestions.generatedSummary}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Skills to Highlight</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestions.highlightSkills?.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">{skill}</span>
                ))}
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800">Missing Skills (Consider Learning)</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestions.missingSkills?.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm">{skill}</span>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800">Recommended Projects</h3>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {suggestions.recommendedProjects?.map((proj, i) => (
                  <li key={i}>{proj}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JDUpload;
