import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { PortfolioContext } from '../context/PortfolioContext';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const ProfessionalTemplate = () => {
  const { 
    personalInfo, 
    aboutMe, 
    socialLinks, 
    skills, 
    experience, 
    projects, 
    education,
    achievements
  } = useContext(PortfolioContext);

  const data = {
    personalInfo: personalInfo?.fullName ? personalInfo : {
      name: "Arun Kumar Swami",
      role: "Software Engineer",
      email: "arun@example.com",
      phone: "+91 9876543210",
      location: "Lucknow, India",
    },
    aboutMe: aboutMe || "Driven Software Engineer with a strong foundation in data structures, competitive programming, and backend architecture. Passionate about leveraging developer tools and generative AI to build scalable, high-performance applications that deliver immediate business value.",
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
        description: "Focusing on robust technical solutions, debugging complex logic flows, and assisting in software architecture design in a highly collaborative remote environment."
      },
      {
        role: "Software Engineer I (Candidate)",
        company: "American Express",
        duration: "May 2026",
        description: "Engaged in the rigorous talent acquisition process focused on building resilient, enterprise-level financial applications."
      }
    ],
    projects: projects?.length > 0 && projects[0].name ? projects : [
      {
        title: "Flipkart GRiD 6.0",
        description: "Collaborated on team-based engineering challenges, focusing on rapid technical problem-solving and highly optimized system design.",
        techStack: ["System Design", "Algorithms", "Optimization"],
        link: "#"
      },
      {
        title: "Advanced Data Structures Implementations",
        description: "Comprehensive implementation of advanced graph algorithms and dynamic programming interview patterns.",
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row min-h-screen shadow-2xl shadow-slate-200/50">
        
        {/* --- Left Sidebar (Sticky on Desktop) --- */}
        <motion.aside 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="w-full lg:w-[400px] bg-slate-900 text-slate-100 flex flex-col lg:sticky lg:top-0 lg:h-screen overflow-y-auto border-r border-slate-800 shrink-0"
        >
          <div className="p-10 flex-grow flex flex-col">
            
            {/* Profile Header */}
            <div className="mb-12 text-center lg:text-left">
              {data.personalInfo?.profilePhoto && (
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 border-2 border-blue-500 rounded-full blur-[2px] opacity-60"></div>
                  <img 
                    src={data.personalInfo.profilePhoto} 
                    alt="Profile" 
                    className="relative w-36 h-36 rounded-full object-cover border-4 border-slate-800 shadow-xl mx-auto lg:mx-0"
                  />
                </div>
              )}
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
                {data.personalInfo?.fullName || data.personalInfo?.name}
              </h1>
              <h2 className="text-lg font-medium text-blue-400 tracking-wide uppercase text-sm">
                {data.personalInfo?.role || "Software Engineer"}
              </h2>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 mb-12">
              {data.personalInfo?.email && (
                <a href={`mailto:${data.personalInfo.email}`} className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                  <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">✉</span>
                  <span className="text-sm font-medium">{data.personalInfo.email}</span>
                </a>
              )}
              {data.personalInfo?.phone && (
                <div className="flex items-center gap-4 text-slate-300 group">
                  <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">☏</span>
                  <span className="text-sm font-medium">{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo?.location && (
                <div className="flex items-center gap-4 text-slate-300 group">
                  <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">📍</span>
                  <span className="text-sm font-medium">{data.personalInfo.location}</span>
                </div>
              )}
            </div>

            {/* Core Competencies (Skills moved to sidebar for a cleaner main view) */}
            {data.skills && data.skills.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-5 pb-2 border-b border-slate-800">Core Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-md border border-slate-700 hover:border-blue-500 hover:text-white transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="mt-auto pt-8 border-t border-slate-800">
              <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-5">Professional Network</h3>
              <div className="flex flex-col gap-3">
                {data.socialLinks?.linkedin && (
                  <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                    LinkedIn Profile &rarr;
                  </a>
                )}
                {data.socialLinks?.github && (
                  <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                    GitHub Repository &rarr;
                  </a>
                )}
                {data.socialLinks?.portfolio && (
                  <a href={data.socialLinks.portfolio} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                    Personal Portfolio &rarr;
                  </a>
                )}
              </div>
            </div>

          </div>
        </motion.aside>

        {/* --- Right Main Content --- */}
        <motion.main 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex-1 bg-white p-8 md:p-16 lg:p-20 lg:overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto space-y-20">
            
            {/* Executive Summary */}
            {data.aboutMe && (
              <motion.section variants={slideUp}>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-4">
                  Executive Summary
                  <span className="h-px bg-slate-200 flex-grow"></span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-light">
                  {data.aboutMe}
                </p>
              </motion.section>
            )}

            {/* Professional Experience */}
            {data.experience && data.experience.length > 0 && (
              <motion.section variants={slideUp}>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-10 flex items-center gap-4">
                  Professional Experience
                  <span className="h-px bg-slate-200 flex-grow"></span>
                </h2>
                
                <div className="relative border-l border-slate-200 ml-3 md:ml-4 space-y-12 pb-4">
                  {data.experience.map((exp, index) => (
                    <div key={index} className="relative pl-8 md:pl-10 group">
                      {/* Timeline Node */}
                      <div className="absolute w-3 h-3 bg-slate-300 rounded-full -left-[6.5px] top-2 ring-4 ring-white group-hover:bg-blue-600 group-hover:scale-125 transition-all duration-300"></div>
                      
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                        <span className="text-sm font-bold tracking-wide text-slate-400 uppercase mt-1 md:mt-0">{exp.duration}</span>
                      </div>
                      <p className="text-md font-semibold text-blue-600 mb-4">{exp.company}</p>
                      <p className="text-slate-600 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Technical Projects */}
            {data.projects && data.projects.length > 0 && (
              <motion.section variants={slideUp}>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-10 flex items-center gap-4">
                  Key Initiatives
                  <span className="h-px bg-slate-200 flex-grow"></span>
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {data.projects.map((proj, index) => (
                    <div key={index} className="group bg-slate-50 border border-slate-200 rounded-xl p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-3">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{proj.title || proj.name}</h3>
                        {(proj.link || proj.liveLink || proj.githubLink) && (
                          <a href={proj.link || proj.liveLink || proj.githubLink} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:underline mt-2 md:mt-0">
                            View Project &rarr;
                          </a>
                        )}
                      </div>
                      <p className="text-slate-600 mb-6 font-light">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {proj.techStack?.map((tech, i) => (
                          <span key={i} className="text-xs font-bold tracking-wider text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded uppercase">
                            {tech}
                          </span>
                        )) || (
                          <span className="text-xs font-bold tracking-wider text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded uppercase">
                            {proj.technologies}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Education & Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
              
              {/* Education */}
              {data.education && data.education.length > 0 && (
                <motion.section variants={slideUp}>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-8 border-b border-slate-200 pb-4">Education</h2>
                  <div className="space-y-6">
                    {data.education.map((edu, index) => (
                      <div key={index} className="relative">
                        <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                        <p className="text-slate-600 font-medium">{edu.institution || edu.institute}</p>
                        <p className="text-sm text-slate-400 font-semibold mt-1">{edu.year || `${edu.startYear} - ${edu.endYear}`}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Achievements */}
              {achievements && achievements.trim() && (
                <motion.section variants={slideUp}>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-8 border-b border-slate-200 pb-4">Achievements</h2>
                  <ul className="space-y-4">
                    {achievements.split('\n').filter(line => line.trim()).map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-blue-500 font-bold mt-0.5">&bull;</span>
                        <span className="text-slate-600 leading-relaxed font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )}

            </div>
          </div>
        </motion.main>
        
      </div>
    </div>
  );
};

export default ProfessionalTemplate;