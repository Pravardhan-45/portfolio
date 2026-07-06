import React from 'react';
import portfolioData from '../data/portfolio';

const ModernTemplate = () => {
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
      email: "hello@example.com",
      phone: "+91 9876543210",
      location: "Lucknow, India",
    },
    aboutMe: aboutMe || "Software Engineer passionate about full-stack development, competitive programming, and integrating generative AI tools into modern applications.",
    socialLinks: socialLinks || {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
    skills: skills?.length > 0 ? skills.map(s => s.name || s) : ["React", "MongoDB Cloud", "Docker", "Postman", "Generative AI", "Data Structures"],
    experience: experience?.length > 0 && experience[0].role ? experience : [
      {
        role: "Technical Solution Engineer (Intern)",
        company: "AlgoUniversity",
        duration: "June 2026 - Present",
        description: "Secured a remote internship position focusing on technical solutions and software architecture."
      }
    ],
    projects: projects?.length > 0 && projects[0].name ? projects : [
      {
        title: "Flipkart GRiD 6.0 Challenge",
        description: "Participated in the competitive software development track involving technical quizzes and team-based engineering challenges.",
        techStack: ["Problem Solving", "System Design"],
        link: "#"
      },
      {
        title: "Portfolio Generator",
        description: "Dynamic web application with multiple template layouts and real-time preview.",
        techStack: ["React", "Tailwind CSS"],
        link: "#"
      }
    ],
    education: education?.length > 0 && education[0].degree ? education : [
      {
        degree: "Computer Science",
        institution: "IIIT Lucknow",
        year: "Current"
      },
      {
        degree: "Graphs Programming Camp",
        institution: "Advanced Data Structures Program",
        year: "2026"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Hero Section with Gradient */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 px-8 py-24 md:px-16 lg:px-32 flex flex-col items-center text-center">
        {data.personalInfo?.profilePhoto && (
          <img 
            src={data.personalInfo.profilePhoto} 
            alt="Profile" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/20 shadow-2xl mb-8"
          />
        )}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg mb-4">
          {data.personalInfo?.fullName || data.personalInfo?.name}
        </h1>
        <p className="text-xl md:text-2xl text-indigo-100 font-medium mb-8">
          {data.personalInfo?.role || "Software Engineer"}
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-white/80 font-medium">
          {data.personalInfo?.location && <span>📍 {data.personalInfo.location}</span>}
          {data.personalInfo?.email && <span>✉️ {data.personalInfo.email}</span>}
        </div>
        
        <div className="mt-8 flex gap-4">
          {data.socialLinks?.github && (
            <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 transition px-6 py-2 rounded-full font-semibold border border-white/30 backdrop-blur-sm">GitHub</a>
          )}
          {data.socialLinks?.linkedin && (
            <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="bg-white text-indigo-600 hover:bg-indigo-50 transition px-6 py-2 rounded-full font-semibold shadow-lg">LinkedIn</a>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 md:px-16 py-16 space-y-20">
        
        {/* About Section */}
        {data.aboutMe && (
          <section className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              {data.aboutMe}
            </p>
          </section>
        )}

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-slate-800 border border-slate-700 text-indigo-300 px-5 py-2 rounded-xl text-md font-medium shadow-sm hover:border-indigo-500 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Experience</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {data.experience.map((exp, index) => (
                <div key={index} className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-slate-500 transition">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-indigo-400 font-medium text-lg">{exp.company}</p>
                    </div>
                    <span className="inline-block mt-2 md:mt-0 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm font-semibold">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-slate-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Projects Section */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
              <div className="space-y-6">
                {data.projects.map((proj, index) => (
                  <div key={index} className="group bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:bg-slate-750 transition">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{proj.title || proj.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.techStack?.map((tech, i) => (
                        <span key={i} className="text-xs font-semibold text-slate-300 bg-slate-700 px-2 py-1 rounded-md">
                          {tech}
                        </span>
                      )) || (
                        <span className="text-xs font-semibold text-slate-300 bg-slate-700 px-2 py-1 rounded-md">
                          {proj.technologies}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-white mb-8">Education</h2>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-slate-400 mt-1">{edu.institution || edu.institute}</p>
                    <p className="text-sm font-medium text-indigo-400 mt-3">{edu.year || `${edu.startYear} - ${edu.endYear}`}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ModernTemplate;