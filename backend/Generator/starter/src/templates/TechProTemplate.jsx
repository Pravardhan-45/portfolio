import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { PortfolioContext } from '../context/PortfolioContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const TechProTemplate = () => {
  const { personalInfo, aboutMe, socialLinks, skills, experience, projects, education } = useContext(PortfolioContext);

  const defaultRole = experience?.[0]?.role || "Software Engineer";
  const data = {
    personalInfo: personalInfo?.fullName ? {
      ...personalInfo,
      name: personalInfo.fullName,
      role: defaultRole
    } : {
      name: "Arun Kumar Swami", role: "Software Engineer", email: "arun@example.com", phone: "+91 9876543210", location: "Lucknow, India",
    },
    aboutMe: aboutMe || "Software Engineer specializing in backend architecture, competitive programming, and algorithmic problem-solving. Focused on building highly scalable, fault-tolerant systems using modern developer tools and generative AI.",
    socialLinks: socialLinks || { github: "https://github.com/", linkedin: "https://linkedin.com/" },
    skills: skills?.length > 0 ? skills.map(s => s.name || s) : ["C++", "React", "Node.js", "MongoDB", "Docker", "Data Structures"],
    experience: experience?.length > 0 && experience[0].role ? experience : [
      { role: "Technical Solution Engineer (Intern)", company: "AlgoUniversity", duration: "June 2026 - Present", description: "Architecting robust technical solutions and debugging complex algorithmic flows in a remote environment." }
    ],
    projects: projects?.length > 0 && projects[0].name ? projects : [
      { title: "Flipkart GRiD 6.0", description: "Engineered scalable solutions for team-based system design challenges.", techStack: ["System Design", "Algorithms"], link: "#" },
      { title: "Portfolio Generator", description: "Dynamic React application utilizing context management and Tailwind CSS.", techStack: ["React", "Node.js", "Tailwind"], link: "#" }
    ],
    education: education?.length > 0 && education[0].degree ? education : [
      { degree: "Computer Science", institution: "IIIT Lucknow", year: "Present" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#1f6feb] selection:text-white relative overflow-hidden">
      
      {}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b949e15_1px,transparent_1px),linear-gradient(to_bottom,#8b949e15_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
        
        {}
        <motion.header 
          initial="hidden" animate="visible" variants={fadeUp} 
          className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-[#30363d] pb-16"
        >
          <div className="flex-grow space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight font-sans">
              {data.personalInfo.name}
            </h1>
            <p className="text-lg md:text-2xl text-[#58a6ff] font-semibold font-sans">
              {data.personalInfo.role}
            </p>
            <p className="text-slate-400 flex items-center gap-2 text-sm">
              📍 {data.personalInfo.location}
            </p>

            <div className="flex flex-wrap gap-6 pt-4 text-sm font-semibold">
              {data.personalInfo.email && (
                <a href={`mailto:${data.personalInfo.email}`} className="flex items-center gap-2 text-[#8b949e] hover:text-[#58a6ff] transition-colors">
                  ✉ {data.personalInfo.email}
                </a>
              )}
              {data.socialLinks?.github && (
                <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#8b949e] hover:text-[#58a6ff] transition-colors">
                  GitHub
                </a>
              )}
              {data.socialLinks?.linkedin && (
                <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#8b949e] hover:text-[#58a6ff] transition-colors">
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {data.personalInfo?.profilePhoto && (
            <div className="shrink-0 relative group">
              <div className="absolute inset-0 bg-[#58a6ff]/10 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
              <img 
                src={data.personalInfo.profilePhoto} 
                alt="Profile" 
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border border-[#30363d] shadow-2xl"
              />
            </div>
          )}
        </motion.header>

        {/* --- Main Content --- */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
          variants={staggerContainer} className="space-y-24"
        >
          
          {/* About */}
          {data.aboutMe && (
            <motion.section variants={fadeUp}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-4">
                About
                <div className="h-px bg-[#30363d] flex-grow"></div>
              </h2>
              <p className="text-lg text-[#8b949e] leading-relaxed max-w-4xl border-l-2 border-[#30363d] pl-6 hover:border-[#79c0ff] transition-colors duration-300">
                {data.aboutMe}
              </p>
            </motion.section>
          )}

          {/* Experience (Git Branch Timeline) */}
          {data.experience && (
            <motion.section variants={fadeUp}>
              <h2 className="text-2xl font-bold text-white mb-10 flex items-center gap-4">
                Experience
                <div className="h-px bg-[#30363d] flex-grow"></div>
              </h2>
              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#3fb950] before:via-[#30363d] before:to-transparent">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    
                    {/* Commit Node */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0d1117] bg-[#238636] text-white shadow shadow-[#3fb950]/50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-125">
                      <span className="text-xs font-mono font-bold">✓</span>
                    </div>
                    
                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-[#161b22] border border-[#30363d] p-6 rounded-xl hover:border-[#3fb950]/80 hover:shadow-lg hover:shadow-[#3fb950]/10 transition-all duration-300">
                      <div className="flex flex-col mb-3 font-sans">
                        <span className="text-[#79c0ff] font-mono text-sm mb-1">{exp.duration}</span>
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <span className="text-[#3fb950] font-semibold">{exp.company}</span>
                      </div>
                      <p className="text-[#8b949e] leading-relaxed text-sm">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Projects */}
          {data.projects && (
            <motion.section variants={fadeUp}>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                Projects
                <div className="h-px bg-[#30363d] flex-grow"></div>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {data.projects.map((proj, index) => (
                  <div key={index} className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden hover:-translate-y-2 hover:border-[#58a6ff]/50 hover:shadow-2xl hover:shadow-[#58a6ff]/10 transition-all duration-300 flex flex-col group">
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#58a6ff] transition-colors">{proj.title || proj.name}</h3>
                        {(proj.link || proj.liveLink || proj.githubLink) && (
                          <a href={proj.link || proj.liveLink || proj.githubLink} target="_blank" rel="noreferrer" className="text-xs text-[#58a6ff] hover:underline">
                            View Project ↗
                          </a>
                        )}
                      </div>
                      <p className="text-[#8b949e] text-sm mb-6 flex-grow leading-relaxed">{proj.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {proj.techStack?.map((tech, i) => (
                          <span key={i} className="text-xs font-mono font-semibold text-[#a5d6ff] bg-[#1f6feb]/10 px-2.5 py-1 rounded border border-[#1f6feb]/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Skills Grid */}
          {data.skills && (
            <motion.section variants={fadeUp}>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                Skills
                <div className="h-px bg-[#30363d] flex-grow"></div>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 bg-[#161b22] border border-[#30363d] px-4 py-3 rounded-lg hover:border-[#d2a8ff]/50 hover:bg-[#d2a8ff]/5 transition-all duration-300 cursor-default hover:-translate-y-1">
                    <div className="w-2 h-2 rounded-full bg-[#d2a8ff]"></div>
                    <span className="text-sm text-[#c9d1d9]">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <motion.section variants={fadeUp} className="pb-20">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                Education
                <div className="h-px bg-[#30363d] flex-grow"></div>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {data.education.map((edu, index) => (
                  <div key={index} className="bg-[#161b22] border border-[#30363d] p-6 rounded-xl hover:border-[#ff7b72]/50 transition-colors">
                    <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                    <p className="text-[#8b949e] mb-3">{edu.institution || edu.institute}</p>
                    <span className="text-xs font-mono text-[#ff7b72] px-2 py-1 bg-[#ff7b72]/10 rounded border border-[#ff7b72]/20">
                      {edu.year || `${edu.startYear} - ${edu.endYear}`}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default TechProTemplate;