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
    errors.push("Full Name is required (at least 2 characters).");
  }

  if (!emailPattern.test(email)) {
    errors.push("A valid Email address is required.");
  }

  if (phone && countDigits(phone) !== 10) {
    errors.push("Please enter a valid 10-digit Phone number.");
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
      errors.push(`${label} link must be a valid URL (http:// or https://).`);
    }
  });

  projects.forEach((project = {}, index) => {
    const github = readString(project.githubLink);
    const live = readString(project.liveLink);

    if (github && !isValidUrl(github)) {
      errors.push(`Project ${index + 1}: GitHub link must be a valid URL.`);
    }
    if (live && !isValidUrl(live)) {
      errors.push(`Project ${index + 1}: Live Demo link must be a valid URL.`);
    }
  });

  education.forEach((edu = {}, index) => {
    const start = parseInt(edu.startYear, 10);
    const end = parseInt(edu.endYear, 10);

    if (!Number.isNaN(start) && !Number.isNaN(end) && end < start) {
      errors.push(`Education ${index + 1}: End Year cannot be before Start Year.`);
    }
  });

  return { isValid: errors.length === 0, errors };
};
