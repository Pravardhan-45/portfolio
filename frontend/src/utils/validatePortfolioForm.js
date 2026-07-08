const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const countDigits = (value) => (value.match(/\d/g) || []).length;

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const readString = (value) => (typeof value === "string" ? value.trim() : "");

export const validatePortfolioForm = ({
  personalInfo = {},
  socialLinks = {},
  projects = [],
  education = [],
  experience = [],
  skills = [],
  certifications = "",
} = {}) => {
  const errors = [];

  // Personal Info
  const fullName = readString(personalInfo.fullName);
  const email = readString(personalInfo.email);
  const phone = readString(personalInfo.phone);
  const location = readString(personalInfo.location);

  if (fullName.length < 2) {
    errors.push({ message: "Full Name is required.", fieldId: "input-fullName" });
  }

  if (!emailPattern.test(email)) {
    errors.push({ message: "A valid Email address is required.", fieldId: "input-email" });
  }

  if (!phone || countDigits(phone) !== 10) {
    errors.push({ message: "A valid 10-digit Phone number is required.", fieldId: "input-phone" });
  }

  if (!location) {
    errors.push({ message: "Location is required.", fieldId: "input-location" });
  }

  if (!personalInfo.profilePhoto) {
    errors.push({ message: "Profile Image is required." });
  }

  // Skills
  if (!skills || skills.length === 0 || skills.every(s => !readString(s?.name || s))) {
    errors.push({ message: "At least one Technical Skill is required." });
  }

  // Certifications
  if (!readString(certifications)) {
    errors.push({ message: "Certifications are required." });
  }

  // Social Links
  const github = readString(socialLinks.github);
  const linkedin = readString(socialLinks.linkedin);

  if (!github || !isValidUrl(github)) {
    errors.push({ message: "GitHub link is required and must be a valid URL.", fieldId: "input-github" });
  }
  if (!linkedin || !isValidUrl(linkedin)) {
    errors.push({ message: "LinkedIn link is required and must be a valid URL.", fieldId: "input-linkedin" });
  }

  const portfolio = readString(socialLinks.portfolio);
  const twitter = readString(socialLinks.twitter);
  if (portfolio && !isValidUrl(portfolio)) {
    errors.push({ message: "Portfolio link must be a valid URL.", fieldId: "input-portfolio" });
  }
  if (twitter && !isValidUrl(twitter)) {
    errors.push({ message: "Twitter link must be a valid URL.", fieldId: "input-twitter" });
  }

  // Projects
  projects.forEach((project = {}, index) => {
    if (!readString(project.name)) {
      errors.push({ message: `Project ${index + 1}: Name is required.` });
    }
    if (!readString(project.description)) {
      errors.push({ message: `Project ${index + 1}: Description is required.` });
    }
    if (!readString(project.technologies)) {
      errors.push({ message: `Project ${index + 1}: Technologies are required.` });
    }

    const pGithub = readString(project.githubLink);
    const pLive = readString(project.liveLink);

    if (!pGithub || !isValidUrl(pGithub)) {
      errors.push({ message: `Project ${index + 1}: GitHub link is required and must be a valid URL.`, fieldId: `input-project-${index}-github` });
    }
    if (pLive && !isValidUrl(pLive)) {
      errors.push({ message: `Project ${index + 1}: Live Demo link must be a valid URL.`, fieldId: `input-project-${index}-live` });
    }
  });

  // Education
  education.forEach((edu = {}, index) => {
    if (!readString(edu.institute)) {
      errors.push({ message: `Education ${index + 1}: College / University is required.` });
    }
    if (!readString(edu.degree)) {
      errors.push({ message: `Education ${index + 1}: Degree is required.` });
    }
    if (!readString(edu.branch)) {
      errors.push({ message: `Education ${index + 1}: Branch is required.` });
    }
    if (!readString(edu.grade)) {
      errors.push({ message: `Education ${index + 1}: CGPA / Percentage is required.` });
    }
    if (!readString(edu.startYear)) {
      errors.push({ message: `Education ${index + 1}: Start Date is required.` });
    }
    if (!readString(edu.endYear)) {
      errors.push({ message: `Education ${index + 1}: End Date is required.`, fieldId: `input-education-${index}-endYear` });
    } else if (readString(edu.startYear)) {
      const start = parseInt(edu.startYear.replace('-', ''), 10);
      const end = parseInt(edu.endYear.replace('-', ''), 10);
      if (!Number.isNaN(start) && !Number.isNaN(end) && end < start) {
        errors.push({ message: `Education ${index + 1}: End Date cannot be before Start Date.`, fieldId: `input-education-${index}-endYear` });
      }
    }
  });

  // Experience (Optional, but if filled partially, then requires all fields)
  experience.forEach((exp = {}, index) => {
    const c = readString(exp.company);
    const r = readString(exp.role);
    const sd = readString(exp.startDate);
    const ed = readString(exp.endDate);
    const resp = readString(exp.responsibilities);

    // If completely empty, ignore it (allows freshers to have no experience)
    if (!c && !r && !sd && !ed && !resp) {
      return;
    }

    if (!c) errors.push({ message: `Experience ${index + 1}: Company Name is required.` });
    if (!r) errors.push({ message: `Experience ${index + 1}: Job Role is required.` });
    if (!sd) errors.push({ message: `Experience ${index + 1}: Start Date is required.` });
    if (!ed) errors.push({ message: `Experience ${index + 1}: End Date is required.` });
    if (!resp) errors.push({ message: `Experience ${index + 1}: Responsibilities are required.` });
  });

  return { isValid: errors.length === 0, errors };
};

export const isPortfolioComplete = (data) => validatePortfolioForm(data).isValid;
