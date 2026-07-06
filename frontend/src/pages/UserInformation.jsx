import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { validatePortfolioForm } from "../utils/validatePortfolioForm";
import { getPortfolio, savePortfolio } from "../api/portfolioApi";
import PersonalInfo from "../components/PersonalInfo";
import AboutMe from "../components/AboutMe";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Achievements from "../components/Achievements";
import SocialLinks from "../components/SocialLinks";

function UserInformation() {
  const navigate = useNavigate();
  const {
    personalInfo,
    setPersonalInfo,
    aboutMe,
    setAboutMe,
    education,
    setEducation,
    skills,
    setSkills,
    projects,
    setProjects,
    experience,
    setExperience,
    certifications,
    setCertifications,
    achievements,
    setAchievements,
    socialLinks,
    setSocialLinks,
  } = usePortfolio();
  const [errors, setErrors] = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);
  const [savingPortfolio, setSavingPortfolio] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadSavedPortfolio = async () => {
      setLoadingPortfolio(true);

      try {
        const data = await getPortfolio();
        const portfolio = data.portfolio;

        if (!isMounted || !portfolio) {
          return;
        }

        setPersonalInfo(portfolio.personalInfo || {});
        setAboutMe(portfolio.aboutMe || "");
        setEducation(portfolio.education || []);
        setSkills(portfolio.skills || []);
        setProjects(portfolio.projects || []);
        setExperience(portfolio.experience || []);
        setCertifications(portfolio.certifications || "");
        setAchievements(portfolio.achievements || "");
        setSocialLinks(portfolio.socialLinks || {});
      } catch (err) {
        if (err.response?.status !== 404 && isMounted) {
          setErrors([{ message: "Unable to load your saved portfolio. Please try again." }]);
        }
      } finally {
        if (isMounted) {
          setLoadingPortfolio(false);
        }
      }
    };

    loadSavedPortfolio();

    return () => {
      isMounted = false;
    };
  }, [
    setAchievements,
    setAboutMe,
    setCertifications,
    setEducation,
    setExperience,
    setPersonalInfo,
    setProjects,
    setSkills,
    setSocialLinks,
  ]);

  const buildPortfolioPayload = () => ({
    personalInfo: {
      ...personalInfo,
      profilePhoto:
        typeof personalInfo.profilePhoto === "string"
          ? personalInfo.profilePhoto
          : "",
    },
    aboutMe,
    education,
    skills,
    projects,
    experience,
    certifications,
    achievements,
    socialLinks,
  });

  const handleSave = async () => {
    const { isValid, errors: validationErrors } = validatePortfolioForm({
      personalInfo,
      socialLinks,
      projects,
      education,
    });

    if (!isValid) {
      setErrors(validationErrors);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return;
    }

    setErrors([]);
    setSavingPortfolio(true);

    try {
      const data = await savePortfolio(buildPortfolioPayload());

      if (data.portfolio) {
        setPersonalInfo(data.portfolio.personalInfo || {});
        setAboutMe(data.portfolio.aboutMe || "");
        setEducation(data.portfolio.education || []);
        setSkills(data.portfolio.skills || []);
        setProjects(data.portfolio.projects || []);
        setExperience(data.portfolio.experience || []);
        setCertifications(data.portfolio.certifications || "");
        setAchievements(data.portfolio.achievements || "");
        setSocialLinks(data.portfolio.socialLinks || {});
      }

      navigate("/jd-upload");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Unable to save your portfolio. Please try again.";
      setErrors([{ message }]);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } finally {
      setSavingPortfolio(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-16 px-5 mb-10 shadow-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-md">
            Build Your Portfolio
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl mx-auto">
            Fill in the details below to generate a stunning, AI-powered portfolio instantly.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 pb-32">
        {loadingPortfolio && (
          <div className="flex justify-center items-center mb-8">
            <span className="animate-pulse bg-blue-100 text-blue-800 px-6 py-2 rounded-full font-medium shadow-sm">
              Loading your saved portfolio...
            </span>
          </div>
        )}
        
        <div className="space-y-8">
          <PersonalInfo />
          <AboutMe />
          <Education />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Achievements />
          <SocialLinks />
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6 mt-10 shadow-sm">
            <h3 className="font-bold text-red-800 mb-2 text-lg">
              Action Required
            </h3>
            <p className="text-red-700 mb-3">Please fix the following issues before continuing:</p>
            <ul className="list-disc list-inside text-red-600 space-y-1.5 font-medium">
              {errors.map((err, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:text-red-800 hover:underline transition-colors"
                  onClick={() => {
                    if (err.fieldId) {
                      const el = document.getElementById(err.fieldId);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        el.focus();
                      }
                    }
                  }}
                >
                  {err.message || err}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sticky Bottom Save Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-4 z-50">
        <div className="max-w-6xl mx-auto flex justify-center md:justify-end">
          <button
            onClick={handleSave}
            disabled={savingPortfolio}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg px-12 py-3 rounded-full hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            {savingPortfolio ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : "Save & Continue to JD Analysis"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
