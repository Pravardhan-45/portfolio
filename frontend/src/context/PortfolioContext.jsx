import { createContext, useState, useContext } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    profilePhoto: null,
  });

  const [aboutMe, setAboutMe] = useState('');
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certifications, setCertifications] = useState('');
  const [achievements, setAchievements] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    linkedin: '',
    portfolio: '',
    twitter: ''
  });

  return (
    <PortfolioContext.Provider value={{
      personalInfo, setPersonalInfo,
      aboutMe, setAboutMe,
      education, setEducation,
      skills, setSkills,
      projects, setProjects,
      experience, setExperience,
      certifications, setCertifications,
      achievements, setAchievements,
      socialLinks, setSocialLinks
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
