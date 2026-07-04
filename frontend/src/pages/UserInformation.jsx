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
          setErrors(["Unable to load your saved portfolio. Please try again."]);
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
      setErrors([message]);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } finally {
      setSavingPortfolio(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Portfolio Details
        </h1>
        {loadingPortfolio && (
          <p className="text-center text-blue-600 mb-6">
            Loading saved portfolio...
          </p>
        )}
        <PersonalInfo />
        <AboutMe />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Achievements />
        <SocialLinks />

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-5 mb-6">
            <p className="font-semibold text-red-700 mb-2">
              Please fix the following before continuing:
            </p>
            <ul className="list-disc list-inside text-red-600 space-y-1">
              {errors.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={handleSave}
            disabled={savingPortfolio}
            className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {savingPortfolio
              ? "Saving..."
              : "Save & Continue to JD Analysis"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
