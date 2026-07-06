import React from 'react';
import portfolioData from '../data/portfolio';

const ProfessionalTemplate = () => {
  const { 
    personalInfo, 
    aboutMe, 
    socialLinks, 
    skills, 
    experience, 
    projects, 
    education 
  } = portfolioData;

  const data = {
    personalInfo: personalInfo?.fullName ? personalInfo : {
      name: "Arun Kumar Swami",
      role: "Software Engineer",
      email: "arun@example.com",
      phone: "+91 9876543210",
      location: "Lucknow, India",
    },
    aboutMe: aboutMe || "Driven Software Engineer with a strong foundation in data structures, competitive programming, and backend architecture. Passionate about leveraging developer tools and generative AI to build scalable applications.",
    socialLinks: socialLinks || {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      portfolio: "https://myportfolio.com"
    },
    skills: skills?.length > 0 ? skills.map(s => s.name || s) : ["React", "Node.js", "MongoDB Cloud", "Docker", "Postman", "Generative AI", "C++"],
    experience: experience?.length > 0 && experience[0].role ? experience : [
      {
        role: "Technical Solution Engineer (Intern)",
        company: "AlgoUniversity",
        duration: "June 2026 - Present",
        description: "Focusing on robust technical solutions, debugging, and assisting in software architecture design in a remote environment."
      },
      {
        role: "Software Engineer I (Candidate)",
        company: "American Express",
        duration: "May 2026",
        description: "Engaged in the talent acquisition process for building enterprise-level financial applications."
      }
    ],
    projects: projects?.length > 0 && projects[0].name ? projects : [
      {
        title: "Flipkart GRiD 6.0",
        description: "Collaborated on team-based engineering challenges and technical problem-solving.",
        techStack: ["System Design", "Algorithms"],
        link: "#"
      },
      {
        title: "Advanced Data Structures Implementations",
        description: "Comprehensive implementation of advanced graph algorithms and interview patterns.",
        techStack: ["C++", "Graphs", "Dynamic Programming"],
        link: "#"
      }
    ],
    education: education?.length > 0 && education[0].degree ? education : [
      {
        degree: "Computer Science",
        institution: "IIIT Lucknow",
        year: "Present"
      },
      {
        degree: "Graphs Programming Camp 2026",
        institution: "Intensive Training Program",
        year: "2026"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-800 flex justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row border border-neutral-200">
        
        {/* --- Left Sidebar --- */}
        <aside className="w-full md:w-1/3 bg-slate-800 text-white p-8 flex flex-col">
          <div className="mb-10 text-center md:text-left">
            {data.personalInfo?.profilePhoto && (
              <img 
                src={data.personalInfo.profilePhoto} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-slate-600 mb-6 mx-auto md:mx-0 shadow-lg"
              />
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{data.personalInfo?.fullName || data.personalInfo?.name}</h1>
            <h2 className="text-lg text-slate-300 font-medium">{data.personalInfo?.role || "Software Engineer"}</h2>
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
                    <p className="text-sm text-slate-400">{edu.institution || edu.institute}</p>
                    <p className="text-xs text-slate-500 mt-1">{edu.year || `${edu.startYear} - ${edu.endYear}`}</p>
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
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{proj.title || proj.name}</h3>
                    <p className="text-neutral-600 text-sm mb-3">{proj.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {proj.techStack?.map((tech, i) => (
                        <span key={i} className="text-xs font-semibold text-slate-600 bg-neutral-200 px-2 py-1 rounded">
                          {tech}
                        </span>
                      )) || (
                        <span className="text-xs font-semibold text-slate-600 bg-neutral-200 px-2 py-1 rounded">
                          {proj.technologies}
                        </span>
                      )}
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