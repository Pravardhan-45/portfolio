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
} = {}) => {
  const errors = [];

  const fullName = readString(personalInfo.fullName);
  const email = readString(personalInfo.email);
  const phone = readString(personalInfo.phone);

  if (fullName.length < 2) {
    errors.push({ message: "Full Name is required (at least 2 characters).", fieldId: "input-fullName" });
  }

  if (!emailPattern.test(email)) {
    errors.push({ message: "A valid Email address is required.", fieldId: "input-email" });
  }

  if (phone && countDigits(phone) !== 10) {
    errors.push({ message: "Please enter a valid 10-digit Phone number.", fieldId: "input-phone" });
  }

  const socialFields = [
    ["github", "GitHub"],
    ["linkedin", "LinkedIn"],
    ["portfolio", "Portfolio"],
    ["twitter", "Twitter"],
  ];

  socialFields.forEach(([key, label]) => {
    const value = readString(socialLinks[key]);
    if (value && !isValidUrl(value)) {
      errors.push({ message: `${label} link must be a valid URL (http:// or https://).`, fieldId: `input-${key}` });
    }
  });

  projects.forEach((project = {}, index) => {
    const github = readString(project.githubLink);
    const live = readString(project.liveLink);

    if (github && !isValidUrl(github)) {
      errors.push({ message: `Project ${index + 1}: GitHub link must be a valid URL.`, fieldId: `input-project-${index}-github` });
    }
    if (live && !isValidUrl(live)) {
      errors.push({ message: `Project ${index + 1}: Live Demo link must be a valid URL.`, fieldId: `input-project-${index}-live` });
    }
  });

  education.forEach((edu = {}, index) => {
    const start = parseInt(edu.startYear, 10);
    const end = parseInt(edu.endYear, 10);

    if (!Number.isNaN(start) && !Number.isNaN(end) && end < start) {
      errors.push({ message: `Education ${index + 1}: End Year cannot be before Start Year.`, fieldId: `input-education-${index}-endYear` });
    }
  });

  return { isValid: errors.length === 0, errors };
};
