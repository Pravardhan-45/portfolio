import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { useNavGuard } from "../context/NavGuardContext";
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
import TopNav from "../components/TopNav";

// Treat an object whose values are all empty as "no real content" so the
// auto-seeded blank rows (Education/Projects/Experience) don't count as edits.
const isEmptyEntry = (obj) =>
  obj &&
  typeof obj === "object" &&
  Object.values(obj).every(
    (v) => v === null || v === undefined || (typeof v === "string" && v.trim() === "")
  );

const normalizeForCompare = (payload) => ({
  ...payload,
  education: (payload.education || []).filter((e) => !isEmptyEntry(e)),
  projects: (payload.projects || []).filter((e) => !isEmptyEntry(e)),
  experience: (payload.experience || []).filter((e) => !isEmptyEntry(e)),
});

function UserInformation() {
  const navigate = useNavigate();
  const navGuard = useNavGuard();
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
  const [pendingNav, setPendingNav] = useState(null);

  const [baseline, setBaseline] = useState(null);
  const isDirtyRef = useRef(false);

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

  const buildBaseline = (p) =>
    JSON.stringify(
      normalizeForCompare({
        personalInfo: {
          ...(p.personalInfo || {}),
          profilePhoto:
            typeof p.personalInfo?.profilePhoto === "string"
              ? p.personalInfo.profilePhoto
              : "",
        },
        aboutMe: p.aboutMe || "",
        education: p.education || [],
        skills: p.skills || [],
        projects: p.projects || [],
        experience: p.experience || [],
        certifications: p.certifications || "",
        achievements: p.achievements || "",
        socialLinks: p.socialLinks || {},
      })
    );

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
        setBaseline(buildBaseline(portfolio));
      } catch (err) {
        if (err.response?.status === 404 && isMounted) {
          // New user without a portfolio. Ensure state is wiped clean so they don't see previous user data.
          setPersonalInfo({ fullName: '', email: '', phone: '', location: '', profilePhoto: null });
          setAboutMe('');
          setEducation([]);
          setSkills([]);
          setProjects([]);
          setExperience([]);
          setCertifications('');
          setAchievements('');
          setSocialLinks({ github: '', linkedin: '', portfolio: '', twitter: '' });
          setBaseline(buildBaseline({}));
        } else if (isMounted) {
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

  // Detect unsaved changes by comparing the current form against the last
  // loaded/saved snapshot.
  const isDirty =
    baseline !== null &&
    JSON.stringify(normalizeForCompare(buildPortfolioPayload())) !== baseline;

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirty]);

  // Warn when leaving the site (tab close / refresh / external URL).
  useEffect(() => {
    const handler = (e) => {
      if (isDirtyRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Intercept in-app navigation (nav bar links) while there are unsaved changes.
  useEffect(() => {
    if (!navGuard) return;
    navGuard.registerGuard((to) => {
      if (isDirtyRef.current) {
        setPendingNav(to);
        return true;
      }
      return false;
    });
    return () => {
      if (navGuard) navGuard.registerGuard(null);
    };
  }, [navGuard]);

  const persistPortfolio = async () => {
    const { isValid, errors: validationErrors } = validatePortfolioForm({
      personalInfo,
      socialLinks,
      projects,
      education,
      experience,
      skills,
      certifications,
    });

    if (!isValid) {
      setErrors(validationErrors);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return false;
    }

    setErrors([]);
    setSavingPortfolio(true);

    try {
      const data = await savePortfolio(buildPortfolioPayload());

      if (data.portfolio) {
        const p = data.portfolio;
        setPersonalInfo(p.personalInfo || {});
        setAboutMe(p.aboutMe || "");
        setEducation(p.education || []);
        setSkills(p.skills || []);
        setProjects(p.projects || []);
        setExperience(p.experience || []);
        setCertifications(p.certifications || "");
        setAchievements(p.achievements || "");
        setSocialLinks(p.socialLinks || {});
        setBaseline(buildBaseline(p));
      }

      return true;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Unable to save your portfolio. Please try again.";
      setErrors([{ message }]);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return false;
    } finally {
      setSavingPortfolio(false);
    }
  };

  const handleSave = async () => {
    const ok = await persistPortfolio();
    if (ok) navigate("/choose-flow");
  };

  const handleLeaveWithoutSaving = () => {
    const to = pendingNav;
    setPendingNav(null);
    isDirtyRef.current = false;
    if (to) navigate(to);
  };

  const handleSaveAndLeave = async () => {
    const to = pendingNav;
    setPendingNav(null);
    const ok = await persistPortfolio();
    if (ok && to) navigate(to);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans">
      <TopNav />
      {/* Hero Header */}
      <div className="bg-slate-950 text-white py-16 px-5 relative overflow-hidden grid-bg border-b border-slate-800/80">
        {/* Background Glowing Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px] animate-blob pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 font-display">
            Build Your Portfolio
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            Fill in the details below to generate a stunning, AI-powered portfolio instantly.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 pb-32 pt-8">
        {!loadingPortfolio && personalInfo?.fullName && (
          <div className="mb-8 bg-emerald-500/5 border border-emerald-500/20 text-emerald-700 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm backdrop-blur-sm animate-fade-in-up">
            <span className="text-2xl bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">👋</span>
            <div>
              <p className="font-bold text-slate-950 font-display">Welcome back!</p>
              <p className="text-slate-500 text-sm font-light">We've securely loaded your saved portfolio data from your previous session.</p>
            </div>
          </div>
        )}
        {loadingPortfolio && (
          <div className="flex justify-center items-center mb-8">
            <span className="animate-pulse bg-indigo-500/10 text-indigo-700 border border-indigo-500/20 px-6 py-2.5 rounded-xl font-semibold shadow-sm text-sm uppercase tracking-wider">
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
          <div className="bg-rose-500/5 border-l-4 border-rose-500 rounded-r-2xl p-6 mt-10 shadow-sm border border-rose-500/10">
            <h3 className="font-bold text-rose-800 mb-2 text-lg font-display">
              Action Required
            </h3>
            <p className="text-slate-600 mb-3 text-sm font-light">Please fix the following issues before continuing:</p>
            <ul className="list-disc list-inside text-rose-600 space-y-1.5 text-xs font-semibold">
              {errors.map((err, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:text-rose-800 hover:underline transition-colors"
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
      <div className="fixed bottom-0 left-0 w-full bg-white/80 border-t border-slate-200/80 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] p-4 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex justify-center md:justify-end">
          <button
            onClick={handleSave}
            disabled={savingPortfolio}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm px-10 py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all uppercase tracking-wider font-display"
          >
            {savingPortfolio ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : "Save & Continue"}
          </button>
        </div>
      </div>

      {/* Unsaved-changes confirmation modal */}
      {pendingNav && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-4">
          <div className="glass-dark shadow-2xl max-w-md w-full p-8 rounded-2xl animate-fade-in-up border border-slate-800/80">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-amber-400">⚠️</span>
              <h3 className="text-xl font-bold text-white font-display">Unsaved changes</h3>
            </div>
            <p className="text-slate-400 mb-6 text-sm font-light leading-relaxed">
              You have unsaved changes to your portfolio. Would you like to save them before leaving this page?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSaveAndLeave}
                disabled={savingPortfolio}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs uppercase tracking-wider font-display disabled:opacity-50"
              >
                {savingPortfolio ? "Saving..." : "Save & Leave"}
              </button>
              <button
                onClick={handleLeaveWithoutSaving}
                className="w-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold py-3.5 rounded-xl hover:bg-rose-500/20 transition-all text-xs uppercase tracking-wider"
              >
                Leave without saving
              </button>
              <button
                onClick={() => setPendingNav(null)}
                className="w-full text-slate-400 font-semibold py-2 hover:text-white transition-colors text-xs uppercase tracking-wider"
              >
                Stay on this page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInformation;
