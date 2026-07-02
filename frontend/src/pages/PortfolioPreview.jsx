import React, { useState } from 'react';
import MinimalTemplate from '../templates/MinimalTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';

const PortfolioPreview = () => {
  // By default hum 'professional' template dikhayenge
  const [selectedTemplate, setSelectedTemplate] = useState('professional');

  // Yeh function decide karega ki konsa template render karna hai
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'minimal':
        return <MinimalTemplate />;
      case 'modern':
        return <ModernTemplate />;
      case 'professional':
        return <ProfessionalTemplate />;
      default:
        return <ProfessionalTemplate />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      
      {/* --- Top Control Bar (Fixed) --- */}
      <div className="bg-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-center z-50 sticky top-0">
        <h2 className="text-xl font-bold text-slate-800 mb-4 sm:mb-0">Live Portfolio Preview</h2>
        
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
          </select>
          
          {/* Download Button (Aapke next task ke liye placeholder) */}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm">
            Download ZIP
          </button>
        </div>
      </div>

      {/* --- Template Display Area --- */}
      <div className="flex-grow overflow-auto shadow-inner">
        {/* Yahan par selected template render hoga */}
        {renderTemplate()}
      </div>

    </div>
  );
};

export default PortfolioPreview;