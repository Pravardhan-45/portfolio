import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { PortfolioContext } from '../context/PortfolioContext'; 

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const MinimalTemplate = () => {
  const { 
    personalInfo, aboutMe, socialLinks, skills, experience, projects, education, achievements
  } = useContext(PortfolioContext);

  const defaultRole = experience?.[0]?.role || "Software Developer";
  const data = {
    personalInfo: personalInfo?.fullName ? {
      ...personalInfo,
      name: personalInfo.fullName,
      role: defaultRole
    } : {
      name: "Alex Developer",
      role: "Senior Software Engineer",
      email: "alex@example.com",
      phone: "+91 9876543210",
      location: "Jaipur, India",
    },
    aboutMe: aboutMe || "Passionate about creating seamless user experiences and scalable architecture. I love turning complex problems into simple, beautiful, and intuitive designs that drive real business value.",
    socialLinks: socialLinks || {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
    skills: skills?.length > 0 ? skills.map(s => s.name || s) : ["React", "TypeScript", "Tailwind CSS", "Node.js", "Next.js", "MongoDB"],
    experience: experience?.length > 0 && experience[0].role ? experience : [
      {
        role: "Frontend Engineer",
        company: "Tech Corp",
        duration: "2023 - Present",
        description: "Spearheaded the migration to modern React, improving UI performance by 40% and increasing user retention across the core product suite."
      }
    ],
    projects: projects?.length > 0 && projects[0].name ? projects : [
      {
        title: "Portfolio Generator",
        description: "An AI-powered web application that generates custom portfolios on the fly. Features dynamic routing, real-time live previews, and context management.",
        techStack: ["React", "Node.js", "MongoDB"],
        link: "#"
      }
    ],
    education: education?.length > 0 && education[0].degree ? education : [
      {
        degree: "B.Tech in Computer Science",
        institution: "University of Technology",
        year: "2020 - 2024"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Premium Minimal Light Radial Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none"></div>

      <motion.div 
        className="max-w-4xl mx-auto px-6 py-20 md:py-32 relative z-10 space-y-32"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Header Section */}
        <motion.header variants={fadeUp} className="space-y-8 text-left border-b border-slate-200 pb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight font-display">
                {data.personalInfo.name}
              </h1>
              <p className="text-lg md:text-2xl text-indigo-600 font-mono tracking-wide font-medium">
                {data.personalInfo.role}
              </p>
            </div>
            
            {data.personalInfo?.profilePhoto && (
              <div className="shrink-0">
                <img 
                  src={data.personalInfo.profilePhoto} 
                  alt="Profile" 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover border border-slate-200 shadow-sm"
                />
              </div>
            )}
          </div>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light max-w-3xl">
            {data.aboutMe}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
            {data.personalInfo?.email && <a href={`mailto:${data.personalInfo.email}`} className="hover:text-indigo-600 transition-colors">✉ {data.personalInfo.email}</a>}
            {data.personalInfo?.phone && <span>✆ {data.personalInfo.phone}</span>}
            {data.personalInfo?.location && <span>📍 {data.personalInfo.location}</span>}
          </div>

          <div className="flex gap-4 pt-2">
            {data.socialLinks?.github && (
              <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors">
                GitHub
              </a>
            )}
            {data.socialLinks?.linkedin && (
              <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="px-5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors">
                LinkedIn
              </a>
            )}
          </div>
        </motion.header>

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <motion.section variants={fadeUp} className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">01 // Key Competencies</h2>
            <div className="flex flex-wrap gap-2.5">
              {data.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-mono font-bold shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <motion.section variants={fadeUp} className="space-y-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">02 // Selected Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.projects.map((proj, index) => (
                <div key={index} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 font-display">{proj.title || proj.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">{proj.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {Array.isArray(proj.techStack) ? proj.techStack.map((tech) => (
                      <span key={tech} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-mono font-semibold">{tech}</span>
                    )) : (proj.technologies || proj.techStack || '').split(',').map(t => t.trim()).filter(Boolean).map(tech => (
                      <span key={tech} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-mono font-semibold">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <motion.section variants={fadeUp} className="space-y-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">03 // Work History</h2>
            <div className="space-y-8 border-l border-slate-200 pl-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative space-y-2">
                  <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-indigo-600 border border-white"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 font-display">{exp.role}</h3>
                    <span className="text-xs font-mono text-slate-400">{exp.duration}</span>
                  </div>
                  <p className="text-sm font-semibold text-indigo-600">{exp.company}</p>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <motion.section variants={fadeUp} className="space-y-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">04 // Education</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.education.map((edu, index) => (
                <div key={index} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">{edu.year}</span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 font-display">{edu.degree}</h3>
                  <p className="text-sm text-slate-500 mt-1 font-light">{edu.institution}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>
    </div>
  );
};

export default MinimalTemplate;
