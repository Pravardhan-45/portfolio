import { createContext, useState, useContext } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    city: '',
    state: '',
    pincode: '',
    address: '',
    profilePhoto: null,
    resume: null
  });

  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);

  return (
    <PortfolioContext.Provider value={{
      personalInfo, setPersonalInfo,
      education, setEducation,
      skills, setSkills,
      projects, setProjects,
      experience, setExperience
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
