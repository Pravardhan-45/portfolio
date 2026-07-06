import React, { useContext } from 'react';
// Yahan aap apne actual context ka path update kar lijiyega agar alag ho
import { PortfolioContext } from '../context/PortfolioContext'; 

const MinimalTemplate = () => {
  // Context se data fetch kar rahe hain. 
  // Make sure aapke context mein yehi structure ho ya isko apne according adjust kar lein.
  const { 
    personalInfo, 
    aboutMe, 
    socialLinks, 
    skills, 
    experience, 
    projects, 
    education 
  } = useContext(PortfolioContext);

  const data = {
    personalInfo: personalInfo?.fullName ? personalInfo : {
      name: "Your Name",
      role: "Software Developer",
      email: "email@example.com",
      phone: "+91 0000000000",
      location: "City, Country",
    },
    aboutMe: aboutMe || "A short and crisp summary about your professional background and goals.",
    socialLinks: socialLinks || {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
    skills: skills?.length > 0 ? skills.map(s => s.name || s) : ["React", "JavaScript", "Tailwind CSS", "Node.js"],
    experience: experience?.length > 0 && experience[0].role ? experience : [
      {
        role: "Frontend Engineer",
        company: "Tech Corp",
        duration: "2023 - Present",
        description: "Built responsive web applications and improved UI performance."
      }
    ],
    projects: projects?.length > 0 && projects[0].name ? projects : [
      {
        title: "Portfolio Generator",
        description: "A web app to generate custom portfolios using React and AI.",
        techStack: ["React", "Node.js", "MongoDB"],
        link: "#"
      }
    ],
    education: education?.length > 0 && education[0].degree ? education : [
      {
        degree: "B.Tech in Computer Science",
        institution: "University Name",
        year: "2020 - 2024"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-8 md:p-16 lg:p-24">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* --- Header Section --- */}
        <header className="space-y-4 border-b border-gray-200 pb-8 flex flex-col md:flex-row md:items-center gap-6">
          {data.personalInfo?.profilePhoto && (
            <img 
              src={data.personalInfo.profilePhoto} 
              alt="Profile" 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-100 shadow-md"
            />
          )}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              {data.personalInfo?.fullName || data.personalInfo?.name}
            </h1>
          <p className="text-xl text-gray-600 font-medium">
            {data.personalInfo?.role || "Software Developer"}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-2">
            {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo?.phone && <span>• {data.personalInfo.phone}</span>}
            {data.personalInfo?.location && <span>• {data.personalInfo.location}</span>}
          </div>
          <div className="flex gap-4 pt-2">
            {data.socialLinks?.github && (
              <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">GitHub</a>
            )}
            {data.socialLinks?.linkedin && (
              <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
            )}
          </div>
          </div>
        </header>

        {/* --- About Section --- */}
        {data.aboutMe && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">About</h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl">
              {data.aboutMe}
            </p>
          </section>
        )}

        {/* --- Skills Section --- */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* --- Experience Section --- */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Experience</h2>
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="text-lg font-medium text-gray-900">{exp.role} <span className="text-gray-500 font-normal">at {exp.company}</span></h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap">{exp.duration}</span>
                  </div>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Projects Section --- */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj, index) => (
                <div key={index} className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{proj.title || proj.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.techStack?.map((tech, i) => (
                      <span key={i} className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {tech}
                      </span>
                    )) || (
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {proj.technologies}
                      </span>
                    )}
                  </div>
                  {(proj.link || proj.liveLink || proj.githubLink) && (
                    <a href={proj.link || proj.liveLink || proj.githubLink} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                      View Project &rarr;
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Education Section --- */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution || edu.institute}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">{edu.year || `${edu.startYear} - ${edu.endYear}`}</span>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default MinimalTemplate;