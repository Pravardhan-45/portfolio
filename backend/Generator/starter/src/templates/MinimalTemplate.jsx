import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { PortfolioContext } from '../context/PortfolioContext'; 


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const MinimalTemplate = () => {
  const { 
    personalInfo, aboutMe, socialLinks, skills, experience, projects, education, achievements
  } = useContext(PortfolioContext);

  const data = {
    personalInfo: personalInfo?.fullName ? personalInfo : {
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
      },
      {
        title: "E-Commerce Dashboard",
        description: "A comprehensive analytics dashboard for sellers to track revenue, inventory, and user metrics in real-time.",
        techStack: ["Next.js", "Tailwind", "Prisma"],
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
      
      {}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative z-10 space-y-24"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        
        {}
        <motion.header variants={fadeUp} className="flex flex-col items-center text-center space-y-8">
          {data.personalInfo?.profilePhoto ? (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <img 
                src={data.personalInfo.profilePhoto} 
                alt="Profile" 
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-[6px] border-white shadow-2xl"
              />
            </div>
          ) : (
             <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-full blur-xl opacity-40"></div>
                <img 
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=f3f4f6" 
                  alt="Avatar" 
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-[6px] border-white shadow-2xl"
                />
             </div>
          )}
          
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
              {data.personalInfo?.fullName || data.personalInfo?.name}
            </h1>
            <p className="text-xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 font-bold">
              {data.personalInfo?.role || "Software Developer"}
            </p>
            
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light mt-4">
              {data.aboutMe}
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-500 pt-6">
              {data.personalInfo?.email && <span className="hover:text-indigo-600 cursor-pointer transition-colors">✉ {data.personalInfo.email}</span>}
              {data.personalInfo?.phone && <span>✆ {data.personalInfo.phone}</span>}
              {data.personalInfo?.location && <span>📍 {data.personalInfo.location}</span>}
            </div>

            <div className="flex justify-center gap-4 pt-4">
              {data.socialLinks?.github && (
                <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 transition-all active:scale-95">
                  GitHub
                </a>
              )}
              {data.socialLinks?.linkedin && (
                <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="px-6 py-2.5 rounded-full bg-white text-slate-900 font-medium border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 transition-all active:scale-95">
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </motion.header>

        {}
        {data.skills && data.skills.length > 0 && (
          <motion.section variants={fadeUp} className="flex flex-col items-center text-center">
             <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">Core Technologies</h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
              {data.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] text-slate-700 px-5 py-2.5 rounded-2xl text-sm font-bold hover:-translate-y-1 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-xl transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {}
        {data.projects && data.projects.length > 0 && (
          <motion.section variants={fadeUp}>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Featured Work</h2>
              <div className="h-px bg-slate-200 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj, index) => (
                <div 
                  key={index} 
                  className="group relative bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden"
                >
                  {/* Subtle hover gradient inside card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {proj.title || proj.name}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed mb-8 flex-grow">
                      {proj.description}
                    </p>
                    
                    <div className="space-y-6 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {proj.techStack?.map((tech, i) => (
                          <span key={i} className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {(proj.link || proj.liveLink || proj.githubLink) && (
                        <a 
                          href={proj.link || proj.liveLink || proj.githubLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          Explore Project <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          
          {}
          {data.experience && data.experience.length > 0 && (
            <motion.section variants={fadeUp}>
              <h2 className="text-2xl font-bold text-slate-900 mb-10">Experience</h2>
              <div className="space-y-10 border-l-2 border-indigo-100 pl-8 ml-3">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative space-y-4 group">
                    {/* Glowing Timeline dot */}
                    <div className="absolute -left-[42px] top-1 w-5 h-5 bg-indigo-500 rounded-full border-4 border-slate-50 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300"></div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                      <p className="text-indigo-600 font-semibold mb-2">{exp.company}</p>
                      <span className="inline-block bg-slate-200/50 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold tracking-wide">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Education & Achievements */}
          <div className="space-y-16">
            {data.education && data.education.length > 0 && (
              <motion.section variants={fadeUp}>
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Education</h2>
                <div className="space-y-6">
                  {data.education.map((edu, index) => (
                    <div key={index} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-extrabold text-slate-900">{edu.degree}</h3>
                      <p className="text-slate-600 font-medium mt-1">{edu.institution || edu.institute}</p>
                      <div className="mt-4 text-sm font-bold text-slate-400">
                        {edu.year || `${edu.startYear} - ${edu.endYear}`}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {achievements && achievements.trim() && (
              <motion.section variants={fadeUp}>
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Achievements</h2>
                <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
                  <ul className="space-y-5">
                    {achievements.split('\n').filter(line => line.trim()).map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-sm mt-0.5">
                          ✦
                        </span>
                        <span className="text-slate-300 leading-relaxed">{item}</span>
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

export default MinimalTemplate;
