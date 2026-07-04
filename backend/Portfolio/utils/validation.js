const isPlainObject = (value) => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
};

const readString = (value) => {
    if (typeof value === "string") {
        return value.trim();
    }

    if (value === null || value === undefined) {
        return "";
    }

    return String(value).trim();
};

const asArray = (value) => {
    return Array.isArray(value) ? value : [];
};

const normalizePersonalInfo = (value) => {
    const info = isPlainObject(value) ? value : {};

    return {
        fullName: readString(info.fullName),
        email: readString(info.email),
        phone: readString(info.phone),
        location: readString(info.location),
        profilePhoto: readString(info.profilePhoto)
    };
};

const normalizeSocialLinks = (value) => {
    const links = isPlainObject(value) ? value : {};

    return {
        github: readString(links.github),
        linkedin: readString(links.linkedin),
        portfolio: readString(links.portfolio),
        twitter: readString(links.twitter)
    };
};

const normalizeEducation = (value) => {
    return asArray(value).map((entry) => {
        const item = isPlainObject(entry) ? entry : {};

        return {
            institute: readString(item.institute),
            degree: readString(item.degree),
            branch: readString(item.branch),
            grade: readString(item.grade),
            startYear: readString(item.startYear),
            endYear: readString(item.endYear)
        };
    });
};

const normalizeProjects = (value) => {
    return asArray(value).map((entry) => {
        const item = isPlainObject(entry) ? entry : {};

        return {
            name: readString(item.name),
            description: readString(item.description),
            technologies: readString(item.technologies),
            githubLink: readString(item.githubLink),
            liveLink: readString(item.liveLink)
        };
    });
};

const normalizeExperience = (value) => {
    return asArray(value).map((entry) => {
        const item = isPlainObject(entry) ? entry : {};

        return {
            company: readString(item.company),
            role: readString(item.role),
            startDate: readString(item.startDate),
            endDate: readString(item.endDate),
            responsibilities: readString(item.responsibilities)
        };
    });
};

// Skills may arrive as ["Java", "React"], as a single comma separated string,
// or as [{ name: "Java" }]. Flatten all of those into a clean string array.
const normalizeSkills = (value) => {
    let list = [];

    if (Array.isArray(value)) {
        list = value;
    } else if (typeof value === "string") {
        list = [value];
    }

    return list
        .flatMap((item) => {
            if (typeof item === "string") {
                return item.split(",");
            }

            if (isPlainObject(item)) {
                return [item.name];
            }

            return [item];
        })
        .map((item) => readString(item))
        .filter((item) => item.length > 0);
};

const sectionNormalizers = {
    personalInfo: normalizePersonalInfo,
    aboutMe: readString,
    education: normalizeEducation,
    skills: normalizeSkills,
    projects: normalizeProjects,
    experience: normalizeExperience,
    certifications: readString,
    achievements: readString,
    socialLinks: normalizeSocialLinks
};

// Full save: every known section is normalized (missing ones become defaults).
const validatePortfolio = (body = {}) => {
    if (!isPlainObject(body)) {
        return { error: "Portfolio data must be a valid object" };
    }

    const value = {};

    Object.keys(sectionNormalizers).forEach((key) => {
        value[key] = sectionNormalizers[key](body[key]);
    });

    return { value };
};

// Partial update: only the sections actually present in the body are touched.
const validatePortfolioUpdate = (body = {}) => {
    if (!isPlainObject(body)) {
        return { error: "Portfolio data must be a valid object" };
    }

    const value = {};

    Object.keys(sectionNormalizers).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            value[key] = sectionNormalizers[key](body[key]);
        }
    });

    if (Object.keys(value).length === 0) {
        return { error: "Provide at least one portfolio field to update" };
    }

    return { value };
};

module.exports = {
    validatePortfolio,
    validatePortfolioUpdate
};
