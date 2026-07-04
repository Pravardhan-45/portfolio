const createPortfolioModel = (mongoose) => {
    if (mongoose.models.Portfolio) {
        return mongoose.models.Portfolio;
    }

    const { Schema } = mongoose;

    const personalInfoSchema = new Schema(
        {
            fullName: { type: String, trim: true, default: "" },
            email: { type: String, trim: true, default: "" },
            phone: { type: String, trim: true, default: "" },
            location: { type: String, trim: true, default: "" },
            profilePhoto: { type: String, default: "" }
        },
        { _id: false }
    );

    const educationSchema = new Schema(
        {
            institute: { type: String, trim: true, default: "" },
            degree: { type: String, trim: true, default: "" },
            branch: { type: String, trim: true, default: "" },
            grade: { type: String, trim: true, default: "" },
            startYear: { type: String, trim: true, default: "" },
            endYear: { type: String, trim: true, default: "" }
        },
        { _id: false }
    );

    const projectSchema = new Schema(
        {
            name: { type: String, trim: true, default: "" },
            description: { type: String, trim: true, default: "" },
            technologies: { type: String, trim: true, default: "" },
            githubLink: { type: String, trim: true, default: "" },
            liveLink: { type: String, trim: true, default: "" }
        },
        { _id: false }
    );

    const experienceSchema = new Schema(
        {
            company: { type: String, trim: true, default: "" },
            role: { type: String, trim: true, default: "" },
            startDate: { type: String, trim: true, default: "" },
            endDate: { type: String, trim: true, default: "" },
            responsibilities: { type: String, trim: true, default: "" }
        },
        { _id: false }
    );

    const socialLinksSchema = new Schema(
        {
            github: { type: String, trim: true, default: "" },
            linkedin: { type: String, trim: true, default: "" },
            portfolio: { type: String, trim: true, default: "" },
            twitter: { type: String, trim: true, default: "" }
        },
        { _id: false }
    );

    const portfolioSchema = new Schema(
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
                unique: true,
                index: true
            },
            personalInfo: {
                type: personalInfoSchema,
                default: () => ({})
            },
            aboutMe: { type: String, default: "" },
            education: { type: [educationSchema], default: [] },
            skills: { type: [String], default: [] },
            projects: { type: [projectSchema], default: [] },
            experience: { type: [experienceSchema], default: [] },
            certifications: { type: String, default: "" },
            achievements: { type: String, default: "" },
            socialLinks: {
                type: socialLinksSchema,
                default: () => ({})
            }
        },
        {
            timestamps: true
        }
    );

    return mongoose.model("Portfolio", portfolioSchema);
};

module.exports = createPortfolioModel;
