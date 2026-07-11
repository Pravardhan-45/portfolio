import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { usePortfolio, PortfolioContext } from '../context/PortfolioContext';
import MinimalTemplate from '../templates/MinimalTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import TechProTemplate from '../templates/TechProTemplate';
import TopNav from '../components/TopNav';

const PortfolioPreview = () => {
  const originalContextData = usePortfolio();
  const { 
    personalInfo, 
    aboutMe, 
    socialLinks, 
    skills, 
    experience, 
    projects, 
    education,
    achievements,
    certifications
  } = originalContextData;

  const location = useLocation();
  const suggestions = location.state?.suggestions;

  const mergedData = useMemo(() => {
    if (!suggestions) return null;
    
    // Safely parse AI array suggestions
    const parseArray = (data) => {
      if (Array.isArray(data)) return data.map(i => typeof i === 'string' ? i : JSON.stringify(i));
      if (typeof data === 'string') return data.split(',').map(s => s.trim()).filter(Boolean);
      return [];
    };

    // Extract a smart project title from an AI project description sentence
    const extractProjectTitle = (description) => {
      const lower = description.toLowerCase();
      if (lower.includes('restful') || lower.includes('rest api')) return 'RESTful API Service';
      if (lower.includes('e-commerce') || lower.includes('ecommerce')) return 'E-Commerce Platform';
      if (lower.includes('authentication') || lower.includes('oauth')) return 'Secure Auth System';
      if (lower.includes('dashboard') || lower.includes('analytics')) return 'Analytics Dashboard';
      if (lower.includes('mobile') || lower.includes('app')) return 'Mobile Application';
      if (lower.includes('machine learning') || lower.includes('ml') || lower.includes('ai')) return 'ML / AI Project';
      if (lower.includes('chat') || lower.includes('real-time') || lower.includes('realtime')) return 'Real-Time Chat App';
      if (lower.includes('database') || lower.includes('sql') || lower.includes('redis')) return 'Data-Intensive Application';
      if (lower.includes('microservice')) return 'Microservices Architecture';
      if (lower.includes('frontend') || lower.includes('ui') || lower.includes('angular') || lower.includes('react')) return 'Responsive Web Application';
      const words = description.split(' ').slice(0, 4).join(' ');
      return words.charAt(0).toUpperCase() + words.slice(1);
    };

    const aiHighlightSkills = parseArray(suggestions.highlightSkills);
    const aiMissingSkills = parseArray(suggestions.missingSkills).map(s => `${s} (Learning)`);

    // Filter user's existing projects that have technologies matching highlighted JD skills
    const jdSkillsLower = aiHighlightSkills.map(s => s.toLowerCase());
    const relevantUserProjects = projects.filter(proj => {
      const techStr = (proj.technologies || proj.techStack || '').toLowerCase();
      const descStr = (proj.description || '').toLowerCase();
      return jdSkillsLower.some(skill => techStr.includes(skill) || descStr.includes(skill));
    });
    // Projects NOT matching JD — still keep them but put them after
    const otherUserProjects = projects.filter(proj => !relevantUserProjects.includes(proj));

    const allSkills = [...new Set([...skills, ...aiHighlightSkills])];
    const aiProjects = parseArray(suggestions.recommendedProjects).map((p, idx) => ({
      title: extractProjectTitle(p),
      description: p,
      technologies: allSkills.slice(idx % 2, (idx % 2) + 3).join(', ') || aiHighlightSkills.slice(0, 3).join(', ')
    }));

    // Use AI's own judgment on which achievements are relevant to the JD
    const aiRelevantAchievements = parseArray(suggestions.relevantAchievements);
    // Join into newline-separated string for templates, or empty if AI found none
    const finalAchievements = aiRelevantAchievements.length > 0
      ? aiRelevantAchievements.join('\n')
      : '';

    return {
      ...originalContextData,
      aboutMe: typeof suggestions.generatedSummary === 'string' 
        ? suggestions.generatedSummary 
        : (suggestions.generatedSummary ? JSON.stringify(suggestions.generatedSummary) : aboutMe),
      // Strong JD-matching skills first, then AI highlights, then missing skills to learn
      skills: [...new Set([...aiHighlightSkills, ...skills, ...aiMissingSkills])],
      // JD-relevant user projects first, then AI recommended, then remaining original
      projects: [...relevantUserProjects, ...aiProjects, ...otherUserProjects],
      // Include filtered achievements
      achievements: finalAchievements,
      // Keep certifications intact
      certifications
    };
  }, [suggestions, originalContextData]);

  const activeData = mergedData || originalContextData;

  const [downloading, setDownloading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'minimal':
        return <MinimalTemplate />;
      case 'modern':
        return <ModernTemplate />;
      case 'professional':
        return <ProfessionalTemplate />;
      case 'techpro':
        return <TechProTemplate />;
      default:
        return <ProfessionalTemplate />;
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const payload = {
        template: selectedTemplate,
        portfolio: {
          personalInfo: activeData.personalInfo,
          aboutMe: activeData.aboutMe,
          socialLinks: activeData.socialLinks,
          skills: activeData.skills,
          experience: activeData.experience,
          projects: activeData.projects,
          education: activeData.education,
          achievements: activeData.achievements,
          certifications: activeData.certifications
        }
      };

      const response = await axios.post('/api/download', payload, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `portfolio-${selectedTemplate}.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download portfolio. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <TopNav />

      {/* --- Top Control Bar (Fixed) --- */}
      <div className="bg-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-center z-50 sticky top-0">
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 sm:mb-0">
          <h2 className="text-xl font-bold text-slate-800">Live Portfolio Preview</h2>
          {mergedData && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full shadow-sm border border-emerald-200 flex items-center gap-1.5">
              <span>✨</span> AI-Optimized
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <label htmlFor="template-select" className="font-medium text-slate-600">
            Choose Theme:
          </label>
          <select 
            id="template-select"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 font-medium text-slate-700"
          >
            <option value="minimal">Minimal Theme</option>
            <option value="modern">Modern Theme</option>
            <option value="professional">Professional Theme</option>
            <option value="techpro">TechPro Theme</option>
          </select>
          
          <button 
            onClick={handleDownload}
            disabled={downloading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm"
          >
            {downloading ? 'Generating ZIP...' : 'Download ZIP'}
          </button>
        </div>
      </div>

      {/* --- Template Display Area --- */}
      <div className="flex-grow overflow-auto shadow-inner">
        {mergedData ? (
          <PortfolioContext.Provider value={mergedData}>
            {renderTemplate()}
          </PortfolioContext.Provider>
        ) : (
          renderTemplate()
        )}
      </div>

    </div>
  );
};

export default PortfolioPreview;