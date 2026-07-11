import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { PortfolioContext } from '../context/PortfolioContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const ModernTemplate = () => {
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
      email: "hello@example.com",
      phone: "+91 9876543210",
      location: "Lucknow, India",
    },
    aboutMe: aboutMe || "Software Engineer passionate about full-stack development, competitive programming, and integrating generative AI tools into modern applications. I thrive in building scalable systems and solving complex architectural challenges.",
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
        description: "Secured a remote internship position focusing on technical solutions and software architecture. Optimized existing core logic for faster data retrieval."
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
        description: "Dynamic web application with multiple template layouts and real-time preview functionality.",
        techStack: ["React", "Tailwind CSS", "Node.js"],
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
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 relative overflow-hidden">
      
      {}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        className="max-w-6xl mx-auto px-6 py-20 md:px-12 md:py-28 relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        
        {}
        <motion.header variants={fadeUp} className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 mb-32">
          {data.personalInfo?.profilePhoto && (
            <div className="relative group mb-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-700"></div>
              <img 
                src={data.personalInfo.profilePhoto} 
                alt="Profile" 
                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border border-slate-700/50 shadow-2xl"
              />
            </div>
          )}
          
          <div className="space-y-4 w-full">
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight pb-2">
              {data.personalInfo?.fullName || data.personalInfo?.name}
            </h1>
            <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-semibold tracking-wide">
              {data.personalInfo?.role || "Software Engineer"}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm md:text-base text-slate-400 font-medium">
            {data.personalInfo?.location && <span className="flex items-center gap-2">📍 {data.personalInfo.location}</span>}
            {data.personalInfo?.email && <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">✉️ {data.personalInfo.email}</span>}
            {data.personalInfo?.phone && <span className="flex items-center gap-2">📞 {data.personalInfo.phone}</span>}
          </div>
          
          <div className="flex justify-center gap-5 pt-6">
            {data.socialLinks?.github && (
              <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white transition-all px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-cyan-500/10 active:scale-95">
                GitHub
              </a>
            )}
            {data.socialLinks?.linkedin && (
              <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="bg-slate-100 hover:bg-white text-slate-900 transition-all px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-white/20 active:scale-95">
                LinkedIn
              </a>
            )}
          </div>
        </motion.header>

        {/* --- About Section --- */}
        {data.aboutMe && (
          <motion.section variants={fadeUp} className="mb-24 text-center max-w-3xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">About Me</h2>
            <p className="text-xl text-slate-300 leading-relaxed font-light">
              {data.aboutMe}
            </p>
          </motion.section>
        )}

        {/* --- Skills Section --- */}
        {data.skills && data.skills.length > 0 && (
          <motion.section variants={fadeUp} className="mb-32">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8 text-center">Skills</h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {data.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-slate-900/50 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-900/50 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* --- Experience Section --- */}
        {data.experience && data.experience.length > 0 && (
          <motion.section variants={fadeUp} className="mb-32">
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-3xl font-bold text-white">Experience</h2>
              <div className="h-px bg-gradient-to-r from-slate-800 to-transparent flex-grow"></div>
            </div>
            
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="group bg-slate-900/40 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40 transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.role}</h3>
                      <p className="text-indigo-400 font-medium text-lg mt-1">{exp.company}</p>
                    </div>
                    <span className="inline-flex items-center justify-center bg-slate-950 border border-slate-800 text-slate-400 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-base md:text-lg font-light max-w-4xl">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* --- Grid: Projects & Education --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Projects Section */}
          {data.projects && data.projects.length > 0 && (
            <motion.section variants={fadeUp} className="flex flex-col h-full">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                Projects <span className="h-px bg-slate-800 flex-grow"></span>
              </h2>
              
              <div className="space-y-6 flex-grow">
                {data.projects.map((proj, index) => (
                  <div key={index} className="group bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col h-full">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                      {proj.title || proj.name}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow font-light">
                      {proj.description}
                    </p>
                    
                    <div className="space-y-6 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {proj.techStack?.map((tech, i) => (
                          <span key={i} className="text-xs font-medium text-cyan-200 bg-cyan-950/50 border border-cyan-900/50 px-3 py-1.5 rounded-lg">
                            {tech}
                          </span>
                        )) || (
                          <span className="text-xs font-medium text-cyan-200 bg-cyan-950/50 border border-cyan-900/50 px-3 py-1.5 rounded-lg">
                            {proj.technologies}
                          </span>
                        )}
                      </div>
                      
                      {(proj.link || proj.liveLink || proj.githubLink) && (
                        <a href={proj.link || proj.liveLink || proj.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
                          View Repository <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Education & Achievements Section */}
          <div className="space-y-16 flex flex-col h-full">
            
            {/* Education */}
            {data.education && data.education.length > 0 && (
              <motion.section variants={fadeUp}>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                  Education <span className="h-px bg-slate-800 flex-grow"></span>
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu, index) => (
                    <div key={index} className="bg-slate-900/40 backdrop-blur-sm rounded-3xl p-6 border border-slate-800/80 hover:border-slate-700 transition-colors">
                      <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                      <p className="text-slate-400 text-sm mt-1">{edu.institution || edu.institute}</p>
                      <div className="mt-4 text-xs font-bold tracking-widest uppercase text-slate-500">
                        {edu.year || `${edu.startYear} - ${edu.endYear}`}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Achievements */}
            {achievements && achievements.trim() && (
              <motion.section variants={fadeUp}>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                  Milestones <span className="h-px bg-slate-800 flex-grow"></span>
                </h2>
                <div className="bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 border border-slate-800/80">
                  <ul className="space-y-4">
                    {achievements.split('\n').filter(line => line.trim()).map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 text-xs border border-indigo-500/20 mt-0.5">
                          ✦
                        </span>
                        <span className="text-slate-300 text-sm leading-relaxed font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.section>
            )}

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModernTemplate;