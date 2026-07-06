import React from 'react';

const MinimalTemplate = ({ data }) => {
    
      return (
        <div className="min-h-screen bg-neutral-100 font-sans text-neutral-800 flex justify-center p-4 md:p-8">
          <div className="max-w-6xl w-full bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row border border-neutral-200">
            
            {/* --- Left Sidebar --- */}
            <aside className="w-full md:w-1/3 bg-slate-800 text-white p-8 flex flex-col">
              <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{data.personalInfo?.name}</h1>
                <h2 className="text-lg text-slate-300 font-medium">{data.personalInfo?.role}</h2>
              </div>
    
              <div className="space-y-6 mb-10 flex-grow">
                <div className="space-y-3 text-sm text-slate-300">
                  {data.personalInfo?.email && <p className="flex items-center gap-3"><span className="text-xl">✉</span> {data.personalInfo.email}</p>}
                  {data.personalInfo?.phone && <p className="flex items-center gap-3"><span className="text-xl">☏</span> {data.personalInfo.phone}</p>}
                  {data.personalInfo?.location && <p className="flex items-center gap-3"><span className="text-xl">📍</span> {data.personalInfo.location}</p>}
                </div>
    
                <div className="pt-6 border-t border-slate-600 space-y-3">
                  <h3 className="text-lg font-semibold tracking-wider uppercase text-slate-200">Links</h3>
                  {data.socialLinks?.github && <a href={data.socialLinks.github} className="block text-sm text-blue-300 hover:text-white transition">GitHub Profile</a>}
                  {data.socialLinks?.linkedin && <a href={data.socialLinks.linkedin} className="block text-sm text-blue-300 hover:text-white transition">LinkedIn Profile</a>}
                  {data.socialLinks?.portfolio && <a href={data.socialLinks.portfolio} className="block text-sm text-blue-300 hover:text-white transition">Personal Website</a>}
                </div>
              </div>
    
              {/* Education in Sidebar for Professional look */}
              {data.education && data.education.length > 0 && (
                <div className="pt-6 border-t border-slate-600">
                  <h3 className="text-lg font-semibold tracking-wider uppercase text-slate-200 mb-4">Education</h3>
                  <div className="space-y-4">
                    {data.education.map((edu, index) => (
                      <div key={index}>
                        <p className="font-medium text-white">{edu.degree}</p>
                        <p className="text-sm text-slate-400">{edu.institution}</p>
                        <p className="text-xs text-slate-500 mt-1">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
    
            {/* --- Right Main Content --- */}
            <main className="w-full md:w-2/3 p-8 md:p-12 bg-white">
              
              {/* About */}
              {data.aboutMe && (
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 uppercase tracking-wider">Professional Profile</h2>
                  <p className="text-neutral-600 leading-relaxed text-justify">
                    {data.aboutMe}
                  </p>
                </section>
              )}
    
              {/* Experience */}
              {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-6 uppercase tracking-wider">Experience</h2>
                  <div className="space-y-8">
                    {data.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
                          <h3 className="text-xl font-semibold text-slate-900">{exp.role}</h3>
                          <span className="text-sm font-medium text-slate-500 whitespace-nowrap">{exp.duration}</span>
                        </div>
                        <p className="text-lg text-blue-600 font-medium mb-2">{exp.company}</p>
                        <p className="text-neutral-600 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
    
              {/* Projects */}
              {data.projects && data.projects.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-6 uppercase tracking-wider">Key Projects</h2>
                  <div className="space-y-6">
                    {data.projects.map((proj, index) => (
                      <div key={index} className="bg-neutral-50 p-5 rounded-lg border border-neutral-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{proj.title}</h3>
                        <p className="text-neutral-600 text-sm mb-3">{proj.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {proj.techStack?.map((tech, i) => (
                            <span key={i} className="text-xs font-semibold text-slate-600 bg-neutral-200 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
    
              {/* Skills */}
              {data.skills && data.skills.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-6 uppercase tracking-wider">Technical Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, index) => (
                      <span key={index} className="px-4 py-2 bg-slate-100 text-slate-800 font-medium rounded text-sm border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}
    
            </main>
          </div>
        </div>
      );
    };
    
    export default ProfessionalTemplate;